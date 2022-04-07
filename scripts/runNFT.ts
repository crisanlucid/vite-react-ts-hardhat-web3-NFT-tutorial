import { utils } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const baseTokenURI = 'ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/';

  // Get owner/deployer's wallet address
  const [owner] = await ethers.getSigners();

  // Get contract that we want to deploy
  const contractFactory = await ethers.getContractFactory('NFT');

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(baseTokenURI);

  // Wait for this transaction to be mined
  await contract.deployed();

  // Get contract address
  console.log('Contract deployed to:', contract.address);

  // Reserve NFTs
  let txn = await contract.reserveNFTs();
  await txn.wait();
  console.log('5 NFTs have been reserved');

  // Mint 2 NFTs by sending 0.02 ether
  txn = await contract.mintNFTs(2, { value: utils.parseEther('0.02') });
  await txn.wait();

  // Get all token IDs of the owner
  const tokens = await contract.tokensOfOwner(owner.address);
  console.log('Owner has tokens: ', tokens);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
