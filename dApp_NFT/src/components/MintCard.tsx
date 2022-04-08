/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

export interface IMintCardProps {
  tokenId: string;
  hasFavorite?: boolean;
}

const i18n = {
  addFavorite: 'add to favorite',
  favoriteHeart: 'selected'
};

interface IMetaDataInfo {
  name: string;
}
export const MintCard: React.FC<IMintCardProps> = ({
  tokenId,
  hasFavorite = false
}) => {
  const baseIdImage = 'QmUygfragP8UmCa7aq19AHLttxiLw1ELnqcsQQpM5crgTF';
  const imageURI = `https://cloudflare-ipfs.com/ipfs/${baseIdImage}/${tokenId}.png`;
  const [metaDataInfo, setMetaDataInfo] = useState({} as IMetaDataInfo);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nftTransferOnwnership = (a: any, id: any) => {};
  const onFavoriteList = (tokenId: string, action: string) => {};

  const [toggleFavorite, setToggleFavorite] = useState(hasFavorite);

  const handleFavorite = () => {
    const isFavorite = !toggleFavorite;

    setToggleFavorite(isFavorite);
    onFavoriteList(tokenId, isFavorite ? 'ADD_ACTION' : 'REMOVE_ACTION');
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e?.target.value);
  };

  const sendTransfer = (id: string) => {
    setIsLoading(true);
    console.log('transfer...');
    address && nftTransferOnwnership(address, id);
    setAddress('');
  };

  useEffect(() => {
    const initData = async () => {
      const res = await (
        await fetch(
          `https://opensea.mypinata.cloud/ipfs/QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/${tokenId}`
        )
      ).json();
      console.log(res);
      setMetaDataInfo(res);
    };

    initData();
  }, [tokenId]);

  return (
    <>
      <a href="#" className="block group relative">
        <img
          src={imageURI}
          className="group-hover:opacity-90 w-full"
          alt="..."
          width="600"
          height="600"
        />
      </a>
      <div className="px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl">
            <a href="#" className="hover:text-primary-500 text-gray-900">
              {metaDataInfo?.name}
            </a>
          </h3>
          <button
            type="button"
            className="hover:text-primary-500 inline-block rounded-full text-gray-900"
            onClick={handleFavorite}
            aria-label={toggleFavorite ? i18n.addFavorite : i18n.favoriteHeart}
          >
            {toggleFavorite ? (
              <BsHeartFill size="1.5em" />
            ) : (
              <BsHeart size="1.5em" />
            )}
          </button>
        </div>
        <hr className="border-gray-200 my-4" />
        <div className="flex items-center justify-between">
          <div>
            <a
              href="#"
              className="hover:text-gray-400 inline-flex italic items-center space-x-2 text-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixid=MXwyMDkyMnwwfDF8c2VhcmNofDE5fHxkb2d8ZW58MHx8fA&amp;ixlib=rb-1.2.1q=85&amp;fm=jpg&amp;crop=faces&amp;cs=srgb&amp;w=400&amp;h=400&amp;fit=crop"
                className="border-4 border-secondary-500 rounded-full"
                alt="..."
                width="36"
                height="36"
              />
              <span>Owned by you</span>
            </a>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => sendTransfer(tokenId)}
            disabled={isLoading}
            className="bg-[#2952e3] py-2 px-5 mr-4 rounded-xl cursor-pointer hover:bg-[#2546bd] text-white"
          >
            Transfer
          </button>
          <input
            type="text"
            name="transferEther"
            className="w-full"
            value={address}
            placeholder="eth Address"
            onChange={onChangeText}
          />
        </div>
      </div>
    </>
  );
};
