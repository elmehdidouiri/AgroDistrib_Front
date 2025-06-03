import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    SelectChangeEvent
} from '@mui/material';
import { Produit, FamilleProduit, RootState } from '../../types';
import { createProduit, updateProduit } from '../../store/slices/produitSlice';

interface FormData {
    nom: string;
    description: string;
    prix: string;
    quantite: string;
    familleProduit: FamilleProduit;
}

interface FormErrors {
    nom?: string;
    description?: string;
    prix?: string;
    quantite?: string;
    familleProduit?: string;
}

const ProduitForm: React.FC<{ isEdit?: boolean }> = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { produits } = useSelector((state: RootState) => state.produit);

    const [formData, setFormData] = useState<FormData>({
        nom: '',
        description: '',
        prix: '',
        quantite: '',
        familleProduit: 'LAIT'
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [initialData, setInitialData] = useState<FormData | null>(null);

    useEffect(() => {
        if (isEdit && id) {
            const produit = produits.find(p => p.id === parseInt(id));
            if (produit) {
                const data = {
                    nom: produit.nom,
                    description: produit.description || '',
                    prix: produit.prix.toString(),
                    quantite: produit.quantite.toString(),
                    familleProduit: produit.familleProduit
                };
                setFormData(data);
                setInitialData(data);
            }
        }
    }, [isEdit, id, produits]);

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.nom) newErrors.nom = 'Le nom est requis';
        if (!formData.prix || parseFloat(formData.prix) < 0) newErrors.prix = 'Le prix doit être positif';
        if (!formData.quantite || parseInt(formData.quantite) < 0) newErrors.quantite = 'La quantité doit être positive';
        if (!formData.familleProduit) newErrors.familleProduit = 'La famille de produit est requise';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const formattedData: Produit = {
            nom: formData.nom,
            description: formData.description,
            prix: parseFloat(formData.prix),
            quantite: parseInt(formData.quantite),
            familleProduit: formData.familleProduit
        };

        if (isEdit && id && initialData) {
            const changedFields = Object.entries(formattedData).reduce((acc: Partial<Produit>, [key, value]) => {
                const typedKey = key as keyof Produit;
                const initialValue = initialData[key as keyof FormData];
                const formattedInitialValue = typeof value === 'number' 
                    ? parseFloat(initialValue) 
                    : initialValue;
                
                if (value !== formattedInitialValue) {
                    acc[typedKey] = value;
                }
                return acc;
            }, {});

            if (Object.keys(changedFields).length > 0) {
                await dispatch(updateProduit({ 
                    id: parseInt(id), 
                    data: changedFields 
                }) as any);
            }
        } else {
            await dispatch(createProduit(formattedData) as any);
        }
        
        navigate('/dashboard');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSelectChange = (e: SelectChangeEvent<FamilleProduit>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value as FamilleProduit
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const familleProduits: FamilleProduit[] = ['LAIT', 'VIANDE', 'LEGUME', 'FRUIT'];

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    {isEdit ? 'Modifier le produit' : 'Nouveau produit'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nom"
                        label="Nom du produit"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        error={Boolean(errors.nom)}
                        helperText={errors.nom}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="prix"
                        label="Prix (DH)"
                        name="prix"
                        type="number"
                        value={formData.prix}
                        onChange={handleInputChange}
                        error={Boolean(errors.prix)}
                        helperText={errors.prix}
                    />
                    <FormControl fullWidth margin="normal" required error={Boolean(errors.familleProduit)}>
                        <InputLabel id="familleProduit-label">Famille de produit</InputLabel>
                        <Select
                            labelId="familleProduit-label"
                            id="familleProduit"
                            name="familleProduit"
                            value={formData.familleProduit}
                            label="Famille de produit"
                            onChange={handleSelectChange}
                        >
                            {familleProduits.map((famille) => (
                                <MenuItem key={famille} value={famille}>
                                    {famille}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="quantite"
                        label="Quantité"
                        name="quantite"
                        type="number"
                        value={formData.quantite}
                        onChange={handleInputChange}
                        error={Boolean(errors.quantite)}
                        helperText={errors.quantite}
                    />
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() => navigate('/dashboard')}
                            sx={{ flex: 1 }}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ flex: 1 }}
                        >
                            {isEdit ? 'Modifier' : 'Créer'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProduitForm; 