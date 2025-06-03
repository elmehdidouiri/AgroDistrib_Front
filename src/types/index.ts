export type FamilleProduit = 'LAIT' | 'VIANDE' | 'LEGUME' | 'FRUIT';

export type Role = 'SUPERVISEUR' | 'VENDEUR' | 'CLIENT';

export interface Produit {
    id?: number;
    nom: string;
    description?: string;
    prix: number;
    quantite: number;
    familleProduit: FamilleProduit;
}

export interface User {
    id: number;
    nom: string;
    email: string;
    role: 'SUPERVISEUR' | 'VENDEUR';
    telephone?: string;
    adresse?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {
    nom: string;
    role: 'SUPERVISEUR' | 'VENDEUR';
}

export interface AuthResponse {
    id: number;
    token: string;
    user: User;
}

export interface RootState {
    auth: {
        user: User | null;
        loading: boolean;
        error: string | null;
    };
    produit: {
        produits: Produit[];
        loading: boolean;
        error: string | null;
    };
    vendeur: {
        vendeurs: User[];
        loading: boolean;
        error: string | null;
    };
} 