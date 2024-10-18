import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:5063',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AxiosInstance;
