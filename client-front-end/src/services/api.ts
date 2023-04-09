import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-clie-cont.onrender.com",
    timeout: 5000,
});
