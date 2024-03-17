import axios, { AxiosInstance } from "axios";
import { apiConfig } from "./config";

export const cryptoCompareApiMining: AxiosInstance = axios.create({
  baseURL: apiConfig.cryptoCompare.urlMining,
  headers: {
    "Content-Type": "application/json",
    authorization: `Apikey ${apiConfig.cryptoCompare.key}`,
  },
});

export const cryptoCompareApiData: AxiosInstance = axios.create({
  baseURL: apiConfig.cryptoCompare.urlData,
  headers: {
    "Content-Type": "application/json",
    authorization: `Apikey ${apiConfig.cryptoCompare.key}`,
  },
});

export const blockchairApi: AxiosInstance = axios.create({
  baseURL: apiConfig.blockhair.url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const digiconomistApi: AxiosInstance = axios.create({
  baseURL: apiConfig.digiconomist.url,
});

export const googleTrends: AxiosInstance = axios.create({
  baseURL: apiConfig.googleTrends.url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const defILama: AxiosInstance = axios.create({
  baseURL: apiConfig.defiLama.url,
  headers: {
    "Content-Type": "application/json",
  },
});

export const defILamaCoins: AxiosInstance = axios.create({
  baseURL: apiConfig.defiLama.coinsUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1200000,
});
