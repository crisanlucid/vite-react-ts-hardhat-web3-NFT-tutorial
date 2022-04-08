import React from 'react';

export interface IMintCardProps {
  tokenId: string;
  hasFavorite?: boolean;
}

export const MintCard: React.FC<IMintCardProps> = ({
  tokenId,
  hasFavorite = false
}) => {
  return <>MintCard</>;
};
