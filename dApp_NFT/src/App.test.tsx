/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateTestingUtils } from 'eth-testing';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved
} from '../testUtils';
import App from './App';
import { TransactionProvider } from './context/TransactionContext';

const CONTRACT_GREETING = 'Hello there!1';

vi.mock('ethers', () => {
  const original = vi.importActual('ethers') as any;
  return {
    ...original,
    ethers: {
      ...original?.ethers,
      providers: {
        ...original?.ethers?.providers
      },

      Contract: vi.fn().mockImplementation((..._data: any) => {
        let greeting = CONTRACT_GREETING;
        return {
          greet: () => greeting,
          setGreeting: (value: string) => {
            greeting = value;
            return {
              hash: '0x1something',
              wait: () => {
                return true;
              }
              // And a bunch of other stuff returned for the transaction
            };
          }
        };
      })
    }
  };
});

const hashMock = {
  hash: 'xxxxxx',
  wait: () => Promise.resolve()
};

const MockTransactionService = {
  getNFTContract: () => {
    const mockRerponse = {
      mintNFTs: (_numCountNFT: number, _options: object) => hashMock,
      tokensOfOwner: (_openAccount: string) => ['xxxxx', 'cxcxcvxc'],
      transferFrom: (_currentAccount: any, _addressTo: any, _id: any) =>
        hashMock
    };
    return mockRerponse;
  }
};

describe('<App />', () => {
  window.alert = vi.fn(() => ({}));
  const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });

  const renderApp = () =>
    render(
      <TransactionProvider transactionService={MockTransactionService}>
        <App />
      </TransactionProvider>
    );

  beforeAll(() => {
    // Manually inject the mocked provider in the window as MetaMask does
    global.window.ethereum = testingUtils.getProvider();
  });
  afterEach(() => {
    // Clear all mocks between tests
    testingUtils.clearAllMocks();
  });

  it('Renders <App /> component correctly', () => {
    // Start with not connected wallet
    testingUtils.mockNotConnectedWallet();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts([
      '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
    ]);

    const { getByText } = renderApp();

    const sendCryptoText = getByText(/Send Crypto/i);
    const btnConnect = getByText(/Connect Wallet/i);
    const messageFooter = getByText(/info @ topcraftcrypto.com/i);

    expect(sendCryptoText).toBeInTheDocument();
    expect(btnConnect).toBeInTheDocument();
    expect(messageFooter).toBeInTheDocument();
  });

  it('a user should be able to connect using MetaMask', async () => {
    // Start with not connected wallet
    testingUtils.mockNotConnectedWallet();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts([
      '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
    ]);

    const { getByText } = renderApp();

    const connectButton = await screen.findByRole('button', {
      name: /Connect Wallet/i
    });
    // Click on the button
    fireEvent.click(connectButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/Connect Wallet/i)
    );

    expect(screen.queryByText('Connect Wallet')).not.toBeInTheDocument();
    expect(getByText(/Logout/i)).toBeInTheDocument();
  });
});
