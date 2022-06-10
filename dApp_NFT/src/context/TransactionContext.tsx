import { utils } from 'ethers';
import React, { useEffect, useState } from 'react';

import { HandleChangeType } from '../components/Input';

export const KEY_FAVORITELIST = 'favoritedHeartList';

export interface IFormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

export enum ActionType {
  'REMOVE_ACTION',
  'ADD_ACTION'
}

type nftTransferOnwnershipType = (
  addressTo: string,
  id: string
) => Promise<void>;
type onFavoriteListType = (id: string, action: ActionType) => Promise<void>;

type mintTokenType = (n: number) => Promise<void | undefined>;
export interface ITransactionContextProps {
  transactionCount?: string;
  connectWallet: () => Promise<void>;

  connectWalletAndShowNFT: () => Promise<void>;

  disconnectWallet: () => Promise<void>;
  transactions: any[];
  currentAccount: string;
  isLoading: boolean;
  handleChange: HandleChangeType;
  formData: IFormData;
  mintToken: mintTokenType;
  nftListId: number[];
  nftTransferOnwnership: nftTransferOnwnershipType;
  onFavoriteList: onFavoriteListType;
  nftListFavoriteIds: string[];
  isLoadingNFT: boolean;
}

export const TransactionContext =
  React.createContext<ITransactionContextProps | null>(null);

declare global {
  interface Window {
    ethereum: any;
  }
}

/*global window, localStorage, alert*/

const delay = (ms = 10000) => new Promise((resolve) => setTimeout(resolve, ms));

type TransactionProviderProps = {
  children: React.ReactNode;
  transactionService: any;
};
export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
  transactionService
}) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [nftListId, setNftListId] = useState([]);
  const [nftListFavoriteIds, setNftListFavoriteIds] = useState(
    JSON.parse(localStorage.getItem(KEY_FAVORITELIST) || '[]')
  );

  const handleChange: HandleChangeType = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name as string]: e.target.value
    }));
  };

  const checkIfWalletIsConnected = async () => {
    const ethService = window.ethereum;
    try {
      if (!ethService) alert('Install Metamask in browser!');
      // console.log('======', ethService);
      const accounts = await ethService.request({ method: 'eth_accounts' });

      if (accounts.lenght) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log('No accounts');
      }
      console.log(accounts);
    } catch (error) {
      // console.log('========', error);
      // throw new Error('No ethereum object...');
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window;
    // console.log('I have wallet...');
    try {
      if (!ethereum) alert('Install Metamask in browser!');

      // console.log(window.ethereum);
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      // console.log(error);
      throw new Error('No ethereum object...');
    }
  };

  const connectWalletAndShowNFT = async () => {
    // console.log('I have NFT...');
    const ethServiceNow = window.ethereum;
    try {
      if (!ethServiceNow) alert('Install Metamask in browser!');

      // console.log('?????', ethServiceNow);
      const accounts = await ethServiceNow.request({
        method: 'eth_requestAccounts'
      });

      console.log({ accounts });
      const openAccount = accounts[0];
      setCurrentAccount(openAccount);

      setIsLoadingNFT(true);
      const contract = transactionService.getNFTContract();
      const tokens = await contract.tokensOfOwner(openAccount);

      setNftListId(tokens);
      await delay(5000);

      // console.log('owner has tokens:', tokens);
      setIsLoadingNFT(false);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object...');
    }
  };

  const disconnectWallet = async () => {
    console.log('Disconnecting MetaMask...');
    setCurrentAccount('');
  };

  const mintToken: mintTokenType = async (countNFT) => {
    const { ethereum } = window;
    try {
      if (!ethereum) {
        alert('Install Metamask in browser!');
        return;
      }

      if (!currentAccount) {
        alert('Please log in!');
        return;
      }

      const contract = transactionService.getNFTContract();

      const transactionHash = await contract.mintNFTs(countNFT, {
        value: utils.parseEther('0.03')
      });
      console.log('Loading -', transactionHash.hash);
      setIsLoading(true);
      await transactionHash.wait();
      setIsLoading(false);
      console.log('Success -', transactionHash.hash);

      const tokens = await contract.tokensOfOwner(currentAccount);
      console.log('Owner has tokens: ', tokens);
      // let owner = await contract.ownerOf(currentAccount)
      // console.log(owner)
      setNftListId(tokens);
      setIsLoadingNFT(true);
      await delay(5000);
      setIsLoadingNFT(false);
    } catch (error: any) {
      console.log(error);
      if (error?.code === 'INSUFFICIENT_FUNDS') alert(error?.reason);

      throw new Error('No ethereum object...');
    }
  };

  const nftTransferOnwnership: nftTransferOnwnershipType = async (
    addressTo,
    id
  ) => {
    const { ethereum } = window;
    try {
      if (!ethereum) alert('Install Metamask in browser!');

      const contract = transactionService.getNFTContract();

      const txHash = await contract.transferFrom(currentAccount, addressTo, id);
      console.log('Result Transaction Transfer: ', txHash);

      await txHash.wait();

      const tokens = await contract.tokensOfOwner(currentAccount);
      console.log('Owner has tokens: ', tokens);

      setNftListId(tokens);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object...');
    }
  };

  const onFavoriteList: onFavoriteListType = async (id, action) => {
    const listIds = [...nftListFavoriteIds];

    if (action === ActionType.REMOVE_ACTION) {
      listIds.forEach((value, key) => {
        String(value) === String(id) && listIds.splice(key, 1);
      });
    } else if (action === ActionType.ADD_ACTION) {
      listIds.push(String(id));
    }

    console.log(listIds);
    await localStorage.setItem(KEY_FAVORITELIST, JSON.stringify(listIds));
    await setNftListFavoriteIds(listIds);
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const value: ITransactionContextProps = {
    connectWallet,
    connectWalletAndShowNFT,
    disconnectWallet,
    transactions,
    handleChange,
    currentAccount,
    isLoading,
    formData,
    mintToken,
    nftListId,
    nftTransferOnwnership,
    onFavoriteList,
    nftListFavoriteIds,
    isLoadingNFT
  };
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
