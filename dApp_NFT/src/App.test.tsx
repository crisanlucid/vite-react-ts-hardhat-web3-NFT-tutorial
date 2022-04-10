import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { render } from '../testUtils';
import App from './App';
import { TransactionProvider } from './context/TransactionContext';

describe('<App />', () => {
  const jsdomAlert = window.alert;
  beforeEach(() => {
    window.alert = vi.fn(() => {
      throw new Error('error');
    });
    window.ethereum = {
      request: vi.fn((method: any) => Promise.resolve([]))
    };
  });
  afterEach(() => {
    window.alert = jsdomAlert;
  });

  const renderApp = () =>
    render(
      <TransactionProvider>
        <App />
      </TransactionProvider>
    );

  it('Renders <App /> component correctly', () => {
    const { getByText } = renderApp();

    const sendCryptoText = getByText(/Send Crypto/i);
    const btnConnect = getByText(/Connect Wallet/i);
    const messageFooter = getByText(/info @ topcraftcrypto.com/i);

    expect(sendCryptoText).toBeInTheDocument();
    expect(btnConnect).toBeInTheDocument();
    expect(messageFooter).toBeInTheDocument();
  });
});
