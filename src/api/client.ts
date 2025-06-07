// import { getFromStorage, saveToStorage } from "@/utils/storage";
// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// const client = axios.create({
//   baseURL: "http://192.168.0.221:9000/api/",
// });


// // caching data
// const get = client.get;
// const cache: Record<string, any> = {};

// client.get = async (url: string, config?: AxiosRequestConfig) => {
//   const response = await get(url, config);
//   if (response.data) {
//     saveToStorage({ key: url, value: response.data });
//     return response;
//   }

//   const data = await getFromStorage({ key: url, value: "" });
//   return data ? {
//     ok: true,
//     data
//   } : {
//     response
//   }
// }

// export default client;
import { getFromStorage, saveToStorage } from "@/utils/storage";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// --- Base Axios Client ---
const client = axios.create({
  baseURL: "http://192.168.0.221:9000/api/",
  timeout: 10000, // Optional: Add a timeout for requests
});

// --- In-memory cache (optional, could be removed if only relying on async storage) ---
const inMemoryCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_LIFETIME = 5 * 60 * 1000; // 5 minutes in milliseconds for in-memory cache

// --- Override client.get for caching logic ---
const originalGet = client.get; // Store the original GET method

client.get = async <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<R> => {
  const cacheKey = url; // Use the URL as the cache key

  // 1. Try to get data from network
  try {
    const response = await originalGet<T, R, D>(url, config) as any;

    // If network successful, cache it and return
    if (response.data) {
      // Save to async storage
      saveToStorage({ key: cacheKey, value: response.data });
      // Save to in-memory cache
      inMemoryCache[cacheKey] = { data: response.data, timestamp: Date.now() };
    }
    return response;
  } catch (error) {
    const axiosError = error as AxiosError; // Type assertion for error

    // 2. If network fails, try to retrieve from cache
    console.warn(`Network request failed for ${url}. Attempting to retrieve from cache.`);
    console.error(`Axios Error Status: ${axiosError.response?.status}, Message: ${axiosError.message}`);

    let cachedData: T | null = null;

    // Try in-memory cache first (faster)
    if (inMemoryCache[cacheKey] && (Date.now() - inMemoryCache[cacheKey].timestamp) < CACHE_LIFETIME) {
      cachedData = inMemoryCache[cacheKey].data;
      console.log(`Using in-memory cache for ${url}.`);
    } else {
      // If not in-memory or expired, try async storage
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
      // If cached data is found, return it wrapped in an Axios-like response object
      // This ensures consistency for downstream components expecting an AxiosResponse
      return {
        data: cachedData,
        status: 200, // Assuming cached data implies a 'successful' retrieval
        statusText: 'OK (Cached)',
        headers: {},
        config: config || {},
        request: {}, // Dummy request object
      } as R;
    } else {
      // If no cached data and network failed, re-throw the original error
      console.error(`No cached data found for ${url}. Re-throwing network error.`);
      throw axiosError;
    }
  }
};

export default client;