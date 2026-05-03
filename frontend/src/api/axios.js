import axios from 'axios';

const API = axios.create({
    baseURL: 'https://smart-vote-backend-512811859438.us-central1.run.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

const cache = new Map();

API.cachedPost = async (url, data) => {
    const key = JSON.stringify({ url, data });
    if (cache.has(key)) {
        console.log('Returning cached response for:', url);
        return cache.get(key);
    }
    const response = await API.post(url, data);
    cache.set(key, response);
    return response;
};

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
