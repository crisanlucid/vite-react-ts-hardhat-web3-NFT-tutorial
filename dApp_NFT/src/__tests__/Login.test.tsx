/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateTestingUtils } from 'eth-testing';
import { describe, expect, it } from 'vitest';

import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved
} from '../../testUtils';
import App from '../App';
import { TransactionProvider } from '../context/TransactionContext';

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

describe('Login', async () => {
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
  //mock ethereum
  //mock ethers lib
  it('should login the user', async () => {
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

    await waitForElementToBeRemoved(() => getByText(/Connect Wallet/i));

    expect(connectButton).not.toBeInTheDocument();
    expect(getByText(/Logout/i)).toBeInTheDocument();
  });
});
