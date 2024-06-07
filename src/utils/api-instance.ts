import axios from "axios";

let apiURL = process.env.NEXT_PUBLIC_API;

export const apiInstance = axios.create({
    baseURL: apiURL
})