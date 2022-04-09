import React, { useContext } from 'react';

import {
  ITransactionContextProps,
  TransactionContext
} from '../context/TransactionContext';
import { MintCard } from './MintCard';
import SkeletonCard from './SkeletonCard';

const MintCardList: React.FC = () => {
  const { nftListId, nftListFavoriteIds, isLoadingNFT } = useContext(
    TransactionContext
  ) as ITransactionContextProps;

  const cardstyle = nftListId.length > 1 ? 'md:w-6/12 lg:w-4/12' : 'md:w-10/12';

  const showNFTList = () =>
    nftListId.map((tokenId, index) => (
      <div className={`px-3 w-full  ${cardstyle}`} key={`nft-${index}`}>
        <div className="bg-white overflow-hidden rounded-xl text-gray-500">
          <MintCard
            tokenId={tokenId.toString()}
            hasFavorite={nftListFavoriteIds.includes(tokenId.toString())}
          />
        </div>
      </div>
    ));

  const renderNFTSection = () => {
    return (
      <div className="flex flex-wrap gap-y-6 justify-between mb-12">
        {showNFTList()}
      </div>
    );
  };

  if (isLoadingNFT)
    return (
      <div className="flex flex-wrap gap-y-6 justify-between mb-12">
        <SkeletonCard />
      </div>
    );

  return (
    <>
      {nftListId.length > 0 ? (
        <>{renderNFTSection()}</>
      ) : (
        <div className="flex flex-wrap gap-y-6 justify-center mb-12">
          <p className="inline-block w-full">No NFT exist</p>
        </div>
      )}
    </>
  );
};

export default MintCardList;
