const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetcher = async (endpoint, options = {}) => {
    const { body, ...customConfig } = options;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...customConfig.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (response.ok) {
            return data;
        }

        throw new Error(data.message || 'Something went wrong');
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const api = {
    get: (endpoint, config) => fetcher(endpoint, { ...config, method: 'GET' }),
    post: (endpoint, body, config) => fetcher(endpoint, { ...config, method: 'POST', body }),
    put: (endpoint, body, config) => fetcher(endpoint, { ...config, method: 'PUT', body }),
    delete: (endpoint, config) => fetcher(endpoint, { ...config, method: 'DELETE' }),
};
