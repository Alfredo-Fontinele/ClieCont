import { Client } from "../../../api-client-nodejs/src/entities/Client";
import { createContext, useContext, useState } from "react";
import { IChildren } from "./../interfaces/others";
import { parseCookies, setCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Contact } from "./../../../api-client-nodejs/src/entities/Contact";

interface IApiContext {
    navigate: (to: string) => void;
    user: Client | undefined;
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    setUser: React.Dispatch<React.SetStateAction<Client | undefined>>;
    getUserByToken: () => Promise<Client>;
    setToken: (token: string) => void;
    getToken: () => string;
}

const ApiContext = createContext<IApiContext>({} as IApiContext);

export const ApiProvider = ({ children }: IChildren) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [user, setUser] = useState<Client>();
    const navigate = useNavigate();

    const getUserByToken = async () => {
        const { token } = parseCookies();
        return await api
            .post("/clients/owner", { token })
            .then((res) => res.data)
            .catch(() => false);
    };

    const getToken = () => {
        const { token } = parseCookies();
        return token;
    };

    const setToken = (token: string) => {
        setCookie(null, "token", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
    };

    return (
        <ApiContext.Provider
            value={{
                navigate,
                getUserByToken,
                setToken,
                getToken,
                user,
                setUser,
                contacts,
                setContacts,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
