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
    getUserByTokenCookie: () => Promise<Client>;
    setToken: (token: string) => void;
    getToken: () => string;
    updateContact: (dataBody: any, id: string, token: string) => Promise<any>;
    getClient: (id: string, token: string) => Promise<any>;
    createContact: (body: any) => Promise<any>;
    deleteContact: (id: string, token: string) => Promise<any>;
    currentContact: Contact | undefined;
    setCurrentContact: React.Dispatch<
        React.SetStateAction<Contact | undefined>
    >;
}

const ApiContext = createContext<IApiContext>({} as IApiContext);

export const ApiProvider = ({ children }: IChildren) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [currentContact, setCurrentContact] = useState<Contact>();
    const [user, setUser] = useState<Client>();
    const navigate = useNavigate();

    const getUserByTokenCookie = async () => {
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

    const getClient = async (id: string, token: string) => {
        const { data: userData } = await api.get(`/clients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return userData;
    };

    const createContact = async (body: any) => {
        const { data } = await api.post("/contacts", body);
        return data;
    };

    const updateContact = async (dataBody: any, id: string, token: string) => {
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

    const deleteContact = async (id: string, token: string) => {
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
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
