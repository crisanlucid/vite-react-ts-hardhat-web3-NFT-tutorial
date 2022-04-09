export const shortAddress = (address: string): string =>
  `${address.slice(0, 4)}...${address.slice(address.length - 4)}`;
