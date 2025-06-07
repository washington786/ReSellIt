import { isAxiosError } from "axios";
import client from "./client";

const endpoint = "/listings";

export const fetchListings = async () => {
  try {
    const res = await client.get(`${endpoint}`);
    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "Axios request failed";
      throw new Error(message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
};

interface CreateListingParams {
  data: FormData;
  onUploadProgress(progress: number): void;
}
export const createList = async ({
  data,
  onUploadProgress,
}: CreateListingParams) => {
  try {
    const res = await client.post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        console.log("Raw progress event:", progressEvent);
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Calculated progress: ${percentCompleted}%`);
          onUploadProgress(percentCompleted);
        }
      },
    });
    console.log("data: ", res.data);
    return res;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    if (isAxiosError(error)) {
      const message = error.response?.data.error || "Axios request failed";
      console.log("error: ", error.response?.data.error);
      throw new Error(message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Something went wrong");
  }
};

export const createListing = async ({
  data,
  onUploadProgress,
}: CreateListingParams): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    let progress = 0;

    // Simulate upload progress: increase by 5% every 300ms up to 90%
    const interval = setInterval(() => {
      if (progress < 90) {
        progress += 5;
        onUploadProgress(progress);
      }
    }, 300);

    try {
      const res = await client.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      clearInterval(interval);
      onUploadProgress(100);

      console.log("✅ Upload complete:", res.data);
      resolve(res.data);
    } catch (error) {
      clearInterval(interval);
      onUploadProgress(0); // Reset progress on failure
      console.error("❌ Upload error:", error);
      reject(error);
    }
  });
};
