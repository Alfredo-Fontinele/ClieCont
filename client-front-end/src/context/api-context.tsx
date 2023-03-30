import { Client, Contact } from "../interfaces/entities";

import { createContext, useContext, useState } from "react";
import { IChildren, IDataHandleSubmit } from "./../interfaces/others";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import {
    IContactCreateRequest,
    IContactUpdateRequest,
} from "../interfaces/contacts";

interface IApiContext {
    navigate: (to: string) => void;
    user: Client | undefined;
    contacts: Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    setUser: React.Dispatch<React.SetStateAction<Client | undefined>>;
    getUserByTokenCookie: () => Promise<Client>;
    setToken: (token: string) => void;
    getToken: () => string;
    deleteToken: () => void;
    updateContact: (
        dataBody: IDataHandleSubmit,
        id: string,
        token: string
    ) => Promise<Contact>;
    getClient: (id: string, token: string) => Promise<Client>;
    createContact: (
        body: IContactCreateRequest,
        token: string
    ) => Promise<Contact>;
    deleteContact: (id: string, token: string) => Promise<Contact>;
    currentContact: Contact | undefined;
    setCurrentContact: React.Dispatch<
        React.SetStateAction<Contact | undefined>
    >;
    currentPage: string;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const ApiContext = createContext<IApiContext>({} as IApiContext);

export const ApiProvider = ({ children }: IChildren) => {
    const [currentPage, setCurrentPage] = useState(document.title);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentContact, setCurrentContact] = useState<Contact>();
    const [user, setUser] = useState<Client>();
    const navigate = useNavigate();

    const getUserByTokenCookie = async () => {
        const { token } = parseCookies();
        const user = await api.post("/clients/owner", { token });
        if (!user) {
            return null;
        }
        return user.data;
    };

    const getToken = () => {
        const { token } = parseCookies();
        return token;
    };

    const deleteToken = () => {
        const { token } = parseCookies();
        if (token) {
            destroyCookie(null, "token");
        }
    };

    const setToken = (token: string) => {
        setCookie(null, "token", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
    };

    const getClient = async (id: string, token: string) => {
        const { data: userData } = await api.get(`/clients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return userData;
    };

    const createContact = async (
        body: IContactCreateRequest,
        token: string
    ) => {
        const { data } = await api.post("/contacts", body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    };

    const updateContact = async (
        dataBody: IContactUpdateRequest,
        id: string,
        token: string
    ): Promise<Contact> => {
        const { data: contactData } = await api.patch(
            `/contacts/${id}`,
            dataBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return contactData;
    };

    const deleteContact = async (
        id: string,
        token: string
    ): Promise<Contact> => {
        return await api.delete(`/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    return (
        <ApiContext.Provider
            value={{
                navigate,
                getUserByTokenCookie,
                setToken,
                getToken,
                deleteToken,
                user,
                setUser,
                contacts,
                setContacts,
                updateContact,
                getClient,
                createContact,
                deleteContact,
                currentContact,
                setCurrentContact,
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
