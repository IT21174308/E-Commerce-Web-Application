import { useState, useEffect } from 'react';
import axios from 'axios';
import AxiosInstance from '../utils/axios';

export const useAPI = (url, refresh = false) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await AxiosInstance.get(url);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url, refresh]);

    return { data, error, loading };
};
