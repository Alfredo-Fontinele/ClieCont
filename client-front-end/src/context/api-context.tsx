import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IChildren } from "./../interfaces/index";

interface IApiContext {
    navigate: (to: string) => void;
}

const ApiContext = createContext<IApiContext>({} as IApiContext);

export const ApiProvider = ({ children }: IChildren) => {
    const navigate = useNavigate();
    return (
        <ApiContext.Provider
            value={{
                navigate,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
