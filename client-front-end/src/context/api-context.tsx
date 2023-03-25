import { AxiosResponse } from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { IChildren } from "./../interfaces/others";

interface IApiContext {
    navigate: (to: string) => void;
    getUserInfoByToken: (token: string) => Promise<AxiosResponse<any, any>>;
}

const ApiContext = createContext<IApiContext>({} as IApiContext);

export const ApiProvider = ({ children }: IChildren) => {
    const navigate = useNavigate();
    const getUserInfoByToken = async (token: string) => {
        return await api.get("/clients/owner", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };
    return (
        <ApiContext.Provider
            value={{
                navigate,
                getUserInfoByToken,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
