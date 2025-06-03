import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import produitReducer from './slices/produitSlice';
import vendeurReducer from './slices/vendeurSlice';
import { RootState } from '../types';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        produit: produitReducer,
        vendeur: vendeurReducer,
    },
});

export type { RootState };
export type AppDispatch = typeof store.dispatch; 