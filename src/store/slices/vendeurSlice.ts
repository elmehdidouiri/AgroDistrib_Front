import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { vendeurService } from '../../services/api';
import { User } from '../../types';

interface VendeurState {
    vendeurs: User[];
    selectedVendeur: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: VendeurState = {
    vendeurs: [],
    selectedVendeur: null,
    loading: false,
    error: null,
};

export const fetchVendeurs = createAsyncThunk(
    'vendeur/fetchVendeurs',
    async () => {
        const response = await vendeurService.getAll();
        return response.data.map(vendeur => ({
            ...vendeur,
            fullName: vendeur.fullName || vendeur.nom
        }));
    }
);

export const updateVendeur = createAsyncThunk(
    'vendeur/updateVendeur',
    async ({ id, data }: { id: number; data: Partial<User> }) => {
        const response = await vendeurService.update(id, {
            ...data,
            fullName: data.fullName || data.nom
        });
        return response.data;
    }
);

export const deleteVendeur = createAsyncThunk(
    'vendeur/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            await vendeurService.delete(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur lors de la suppression du vendeur');
        }
    }
);

const vendeurSlice = createSlice({
    name: 'vendeur',
    initialState,
    reducers: {
        setSelectedVendeur: (state, action) => {
            state.selectedVendeur = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendeurs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVendeurs.fulfilled, (state, action) => {
                state.loading = false;
                state.vendeurs = action.payload;
            })
            .addCase(fetchVendeurs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Une erreur est survenue';
            })
            .addCase(updateVendeur.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVendeur.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.vendeurs.findIndex(v => v.id === action.payload.id);
                if (index !== -1) {
                    state.vendeurs[index] = {
                        ...action.payload,
                        fullName: action.payload.fullName || action.payload.nom
                    };
                }
            })
            .addCase(updateVendeur.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Une erreur est survenue';
            })
            .addCase(deleteVendeur.fulfilled, (state, action) => {
                state.vendeurs = state.vendeurs.filter(v => v.id !== action.payload);
            });
    },
});

export const { setSelectedVendeur, clearError } = vendeurSlice.actions;
export default vendeurSlice.reducer; 