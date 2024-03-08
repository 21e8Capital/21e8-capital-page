export const apiConfig = {
  mobula: {
    key: process.env.NEXT_PUBLIC_MOBULA_API,
  },
  blockhair: {
    url: process.env.NEXT_PUBLIC_BLOCKCHAIR_URI,
  },
  digiconomist: {
    url: process.env.NEXT_PUBLIC_DIGICONOMIST_URI,
  },
  cryptoCompare: {
    urlData: process.env.NEXT_PUBLIC_CRYPTOCOMPARE_URI_DATA,
    urlMining: process.env.NEXT_PUBLIC_CRYPTOCOMPARE_URI_MINING,
    key: process.env.NEXT_PUBLIC_CRYPTOCOMPARE_KEY,
  },
  googleTrends: {
    url: process.env.NEXT_PUBLIC_GOOGLE_TRENDS_URI,
  },
};
