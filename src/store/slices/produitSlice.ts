import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { produitService } from '../../services/api';
import { Produit } from '../../types';
import { toast } from 'react-toastify';

interface ProduitState {
    produits: Produit[];
    selectedProduit: Produit | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProduitState = {
    produits: [],
    selectedProduit: null,
    loading: false,
    error: null,
};

export const fetchProduits = createAsyncThunk(
    'produit/fetchProduits',
    async () => {
        const response = await produitService.getAll();
        return response.data;
    }
);

export const createProduit = createAsyncThunk(
    'produit/createProduit',
    async (data: Produit) => {
        const response = await produitService.create(data);
        toast.success('Produit créé avec succès');
        return response.data;
    }
);

export const updateProduit = createAsyncThunk(
    'produit/updateProduit',
    async ({ id, data }: { id: number; data: Partial<Produit> }) => {
        const response = await produitService.update(id, data);
        toast.success('Produit mis à jour avec succès');
        return response.data;
    }
);

export const deleteProduit = createAsyncThunk(
    'produit/deleteProduit',
    async (id: number) => {
        await produitService.delete(id);
        toast.success('Produit supprimé avec succès');
        return id;
    }
);

const produitSlice = createSlice({
    name: 'produit',
    initialState,
    reducers: {
        setSelectedProduit: (state, action) => {
            state.selectedProduit = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduits.fulfilled, (state, action) => {
                state.loading = false;
                state.produits = action.payload;
            })
            .addCase(fetchProduits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Une erreur est survenue';
            })
            .addCase(createProduit.fulfilled, (state, action) => {
                state.produits.push(action.payload);
            })
            .addCase(updateProduit.fulfilled, (state, action) => {
                const index = state.produits.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.produits[index] = {
                        ...state.produits[index],
                        ...action.payload
                    };
                }
            })
            .addCase(deleteProduit.fulfilled, (state, action) => {
                state.produits = state.produits.filter(p => p.id !== action.payload);
            });
    },
});

export const { setSelectedProduit, clearError } = produitSlice.actions;
export default produitSlice.reducer; 