import { isAxiosError } from "axios";
import client from "./client";

const endpoint = "/listings";

export const fetchListings = async () => {
  try {
    const res = await client.get(endpoint);
    console.log("res: ", res);
    return res.data;
  } catch (error) {
    let status =
      error instanceof Error
        ? error.cause
        : isAxiosError(error)
        ? error.response?.status
        : 403;
    let message =
      error instanceof Error
        ? error.message
        : isAxiosError(error)
        ? error.response?.data
        : "Something wrong happened";
    console.log("error message: ", message, " - ", status);
  }
};
