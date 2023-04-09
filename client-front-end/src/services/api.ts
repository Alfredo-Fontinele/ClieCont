import axios from "axios";

// https://api-clie-cont.onrender.com

export const api = axios.create({
    baseURL: "http://localhost:3333",
    timeout: 5000,
});
