# Vite-react-ts-hardhat-web3-NFT tutorial

<p>building a Web3 NFT Minting Dapp with React, TS, Vite, Vitest, Hardhat</p>

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

  - if you've installed correct _git_ you can run `git --version` and you see a response like `git version x.x.x`

- [Nodejs](https://nodejs.org/en/)

  - if you`ve installed _nodejs_ correct you can run:

    - `node --version`and get an ouput like: `vx.x.x`

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`

  - if you`ve installed _yarn_ correct if you can run:

    - `yarn --version` And get an output like: `x.x.x`

    - You might need to install it with npm

> If you like this approach `npx` and `npm` instead of `yarn`, you can use `npx` for execution and `npm` for installing dependencies.

## Quickstart

1. Clone and install dependencies

having all the requirements, run the following code:

```bash

git clone https://github.com/crisanlucid/vite-react-ts-hardhat-web3-NFT-tutorial/

cd vite-react-ts-hardhat-web3-NFT-tutorial

```

Next:

```

yarn install

```

or

```

npm i

```

2. You can now test the contracts!

```

yarn hardhat test
```

or

```

yarn hardhat test
```

# Usage

If you run `yarn hardhat --help` you'll get an output of all the tasks you can run.

## Deploying Contracts

```

yarn hardhat deploy

```

This will deploy your contracts to a local network. Additionally, if on a local network, it will deploy mock Chainlink contracts for you to interact with. If you'd like to interact with your deployed contracts, skip down to [Interacting with Deployed Contracts](#interacting-with-deployed-contracts).

## Run a Local Network

One of the best ways to test and interact with smart contracts is with a local network. To run a local network with all your contracts in it, run the following:

```

yarn hardhat node

```

You'll get a local blockchain, private keys, contracts deployed (from the `deploy` folder scripts), and an endpoint to potentially add to an EVM wallet.

# Frontend

```
cd dApp_NFT
```

and

```
yarn && yarn dev
```

or

```
npm install && npm dev
```

2. Navigate and click NFT link

3. Login with Metamask

   - install [Metamask](https://metamask.io/)
   - log in
   - change Network: Rinkeby
   - add some fake [Eth](https://faucets.chain.link/rinkeby)

4. Click mint button and appove from Metamask

## Other stuff

check tests

```
yarn test
```

or

```
npm test
```

# BONUS:

## HOW TO Install Tailwind)

```
cd dApp_NFT
```

1. Setup Dependecies

```
yarn add -D tailwindcss postcss autoprefixer @tailwindcss/forms
npx tailwindcss init
```

or

```
npm install -D tailwindcss postcss autoprefixer
```

2. Create file tailwind.config.cjs ; cjs - common js file

```
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif']
    },
    extend: {
      screens: {
        mf: '990px'
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(120%)',
            transform: 'translateX(120%)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0%)',
            transform: 'translateX(0%)'
          }
        }
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};

```

3. Create a file postcss.config.cjs

with the config:

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

4. Update dApp_NFT\src\index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```

## HOw TO put API into Frontend App

1. compile the contracts from root (outside of dAppp_NFT)

```
yarn compile
```

or

```
npm compile
```

2. Copy JSON file from _artifacts/contracts/NFT.sol/NFT.json_

```
cp artifacts/contracts/NFT.sol/NFT.json dApp_NFT/src/utils/NFT.contract.json
```

3. create a file constants.ts in ./dApp_NFT/src/utils

```
import nft from './NFT.contract.json';

// NFT contract goes here
export const contractNFTAddress = '';//copy the contract address when you deploy Smart Contract
export const contract_NFT_ABI = nft.abi;

```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

# Resources:

https://rahulsethuram.medium.com/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-tutorial-f07917de48ae

```

```
