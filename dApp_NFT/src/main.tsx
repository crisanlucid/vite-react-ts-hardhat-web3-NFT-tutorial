import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { TransactionProvider } from './context/TransactionContext';

const root = document.getElementById('root') as Element;
ReactDOM.createRoot(root).render(
  <TransactionProvider>
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  </TransactionProvider>
);
