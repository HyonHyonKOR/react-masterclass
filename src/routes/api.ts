export const fetchCoins = () => {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
};

export const fetchCoinInfo = async (coinId: string | undefined) => {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const coinInfoList: any[] = await response.json();
  return coinInfoList.slice(0, 100).find((item) => item.id === coinId);
};

export const fetchCoinPrice = async (coinId: string | undefined) => {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  const coinInfoList: any[] = await response.json();
  return coinInfoList[0];
};
