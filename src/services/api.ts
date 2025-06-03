import axios from 'axios';
import { Produit, LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            config.headers['User-ID'] = userId;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('userId');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (data: LoginRequest) => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        localStorage.setItem('userId', response.data.id.toString());
        return response.data;
    },
    register: async (data: RegisterRequest) => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('userId');
    },
};

export const vendeurService = {
    getAll: () => api.get<User[]>('/vendeurs'),
    getById: (id: number) => api.get<User>(`/vendeurs/${id}`),
    update: (id: number, data: Partial<User>) => api.put<User>(`/vendeurs/${id}`, {
        ...data,
        fullName: data.fullName || data.nom,
    }),
    delete: (id: number) => api.delete(`/vendeurs/${id}`),
};

export const produitService = {
    getAll: () => api.get<Produit[]>('/produits'),
    getById: (id: number) => api.get<Produit>(`/produits/${id}`),
    create: (data: Produit) => api.post<Produit>('/produits', data),
    update: (id: number, data: Partial<Produit>) => api.patch<Produit>(`/produits/${id}`, data),
    delete: (id: number) => api.delete(`/produits/${id}`),
};

export default api; 