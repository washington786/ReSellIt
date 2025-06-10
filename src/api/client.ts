import { getFromStorage, getSecurely, saveToStorage } from "@/utils/storage";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const client = axios.create({
  baseURL: "http://192.168.0.221:9000/api/",
  timeout: 10000,
});

client.interceptors.request.use(async (config) => {
  const token = await getSecurely({ key: "token", value: "" });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => { return Promise.reject(error) });

const inMemoryCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_LIFETIME = 5 * 60 * 1000;


const originalGet = client.get;

client.get = async <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<R> => {
  const cacheKey = url;

  try {
    const response = await originalGet<T, R, D>(url, config) as any;

    if (response.data) {

      saveToStorage({ key: cacheKey, value: response.data });

      inMemoryCache[cacheKey] = { data: response.data, timestamp: Date.now() };
    }
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.warn(`Network request failed for ${url}. Attempting to retrieve from cache.`);
    console.error(`Axios Error Status: ${axiosError.response?.status}, Message: ${axiosError.message}`);

    let cachedData: T | null = null;

    if (inMemoryCache[cacheKey] && (Date.now() - inMemoryCache[cacheKey].timestamp) < CACHE_LIFETIME) {
      cachedData = inMemoryCache[cacheKey].data;
      console.log(`Using in-memory cache for ${url}.`);
    } else {

      try {
        const storedData = await getFromStorage({ key: cacheKey, value: "" });
        if (storedData !== null) {
          cachedData = storedData as T;
          console.log(`Using async storage cache for ${url}.`);
        }
      } catch (storageError) {
        console.error(`Error retrieving from async storage for ${url}:`, storageError);
      }
    }

    if (cachedData !== null) {
      return {
        data: cachedData,
        status: 200,
        statusText: 'OK (Cached)',
        headers: {},
        config: config || {},
        request: {},
      } as R;
    } else {
      console.error(`No cached data found for ${url}. Re-throwing network error.`);
      throw axiosError;
    }
  }
};

export default client;