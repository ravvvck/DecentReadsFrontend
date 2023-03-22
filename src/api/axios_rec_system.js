import axios from 'axios'
const BASE_URL = 'http://127.0.0.1:5000/'

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate =  axios.create({
    responseType: "application/json",
    baseURL: BASE_URL,
    headers: {'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*'}
});