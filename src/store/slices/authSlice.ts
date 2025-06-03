import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { AuthResponse, LoginRequest, User } from '../../types';

interface AuthState {
    user: AuthResponse | null;
    userId: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    userId: localStorage.getItem('userId'),
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            localStorage.setItem('userId', response.data.id.toString());
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 
                'Erreur de connexion. Veuillez vérifier vos identifiants.'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.userId = null;
            state.error = null;
            localStorage.removeItem('userId');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.userId = action.payload.id.toString();
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Une erreur inattendue est survenue';
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 