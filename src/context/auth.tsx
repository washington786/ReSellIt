import { deleteSecurely } from "@/utils/storage";
import { createContext, ReactNode, useContext, useState } from "react";


interface ctx {
    user?: any,
    login(user: string): void;
    logout(): void;
    isLoading: boolean;
    setIsLoading(loading: boolean): void
}

const initialValue: ctx = {
    user: undefined,
    login: () => { },
    logout: () => { },
    isLoading: true,
    setIsLoading: () => { }
}


export const AuthContext = createContext<ctx>(initialValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true)

    async function login(user: any) {
        setUser(user);
    }

    function logout() {
        setUser(undefined);
        deleteSecurely({ key: "token", value: "" })
    }

    const value = { logout, login, user, isLoading, setIsLoading }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuthCtx = () => useContext(AuthContext);