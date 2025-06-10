import { isAxiosError } from "axios";
import client from "./client";
import { ILogin } from "@/interfaces/ILogin";
import { IAccount } from "@/interfaces/IRegister";

const endpoint = "/auth";
const endpoint_register = "/users";

export async function login({ email, password }: ILogin) {
    try {
        const res = await client.post(endpoint, { email, password });
        return res.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const message = error.response?.data?.error || "Axios request failed";
            console.log(message);
            throw new Error(message);
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Something went wrong");
    }

}

export async function register({ email, password, fullname }: IAccount) {
    try {
        const res = await client.post(endpoint_register, { email, password, name: fullname });
        return res.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const message = error.response?.data?.error || "Axios request failed";
            // console.log(message);
            throw new Error(message);
        }

        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error("Something went wrong");
    }

}