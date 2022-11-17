import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate =  axios.create({
    responseType: "application/json",
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*'}
});