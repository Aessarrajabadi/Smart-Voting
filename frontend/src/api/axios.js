import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add request/response interceptors for global error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.error || 'An unexpected error occurred';
        console.error('API Error:', message);
        return Promise.reject(message);
    }
);

export default API;
