import { Header } from "./components/header/index";
import { useApi } from "./context/api-context";
import { RoutesGlobal } from "./routes/index";
import { useEffect } from "react";

export const App = () => {
    const { currentPage, setCurrentPage } = useApi();

    useEffect(() => {
        setCurrentPage(document.title);
    }, [document.title]);

    return (
        <>
            <Header
                currentTypePage={
                    currentPage !== "Dashboard" ? "default" : "dashboard"
                }
            />
            <RoutesGlobal />
        </>
    );
};
