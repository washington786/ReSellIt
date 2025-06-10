import { isAxiosError } from "axios";
import client from "./client";

export const sendMessage = async (body: any) => {
    try {
        const res = await client.post('/messages', body);
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