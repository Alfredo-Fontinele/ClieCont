import { useApi } from "../../context/api-context";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Client } from "./../../../../api-client-nodejs/src/entities/Client";

export const Dashboard = () => {
    const { navigate } = useApi();
    const [user, setUser] = useState<Client>();

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("ClieCont:token");
            if (!token) {
                navigate("/");
                return;
            }
            let teste = token.replaceAll('"', "");
            const { data } = await api.get("/clients/owner", {
                headers: {
                    Authorization: `Bearer ${teste}`,
                },
            });
            console.log(data);
            // if (!data.) {
            //     navigate("/login");
            // }
            // setUser(userFound);
        })();
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
            <div>Olá {user?.name}</div>
        </>
    );
};
