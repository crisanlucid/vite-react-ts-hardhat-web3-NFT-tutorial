import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { utils } from 'ethers';
import { ethers } from 'hardhat';

import { NFT, NFT__factory } from '../typechain';

describe.only('Nft Contract', () => {
  const baseTokenURI = 'ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/';
  const MAX_SUPPLY = 100;
  let nftContract: NFT;
  let owner: SignerWithAddress;
  let NFT_Factory: NFT__factory;

  before(async () => {
    NFT_Factory = await ethers.getContractFactory('NFT');
  });

  beforeEach(async function () {
    // deploy contract with the correct constructor arguments
    nftContract = await NFT_Factory.deploy(baseTokenURI);
    [owner] = await ethers.getSigners();
  });

  it('Should initialize NFT contract ', async () => {
    expect(await nftContract.MAX_SUPPLY()).to.equal(MAX_SUPPLY);
  });

  it('Should set the right owner', async () => {
    expect(await nftContract.owner()).to.equal(await owner.address);
  });

  it('Should mint an SEQUEL NFT', async () => {
    const txn = await nftContract.mintNFTs(1, {
      value: utils.parseEther('0.02')
    });
    await txn.wait();

    // Get all token IDs of the owner
    const tokens = await nftContract.tokensOfOwner(owner.address);
    expect(1).to.equal(tokens.length);
  });
});
