import { isAxiosError } from "axios";
import client from "./client";

export const registerUserNotification = async (token: any) => {
    try {
        const res = await client.get("/expoPushTokens", token);
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
}