import axios, { AxiosInstance } from "axios";
import { apiConfig } from "./config";

export const cryptoCompareAPI: AxiosInstance = axios.create({
  baseURL: apiConfig.cryptoCompare.url,
  headers: {
    "Content-Type": "application/json",
    authorization: `Apikey ${apiConfig.cryptoCompare.key}`,
  },
});
