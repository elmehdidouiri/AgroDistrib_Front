import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import { User } from '../../types';
import { updateVendeur } from '../../store/slices/vendeurSlice';

interface VendeurFormProps {
    vendeur: User;
}

const VendeurForm: React.FC<VendeurFormProps> = ({ vendeur }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nom: vendeur.nom || '',
            fullName: vendeur.fullName || '',
            email: vendeur.email || '',
            telephone: vendeur.telephone || '',
            adresse: vendeur.adresse || '',
        },
        validationSchema: Yup.object({
            nom: Yup.string().required('L\'identifiant est requis'),
            fullName: Yup.string().required('Le nom complet est requis'),
            email: Yup.string()
                .email('Email invalide')
                .required('L\'email est requis'),
            telephone: Yup.string().required('Le téléphone est requis'),
            adresse: Yup.string().required('L\'adresse est requise'),
        }),
        onSubmit: async (values) => {
            if (vendeur.id) {
                const action = await dispatch(updateVendeur({
                    id: vendeur.id,
                    data: { ...vendeur, ...values }
                }) as any);
                
                if (updateVendeur.fulfilled.match(action)) {
                    navigate('/dashboard');
                }
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Modifier le vendeur
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Nom Complet"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="telephone"
                        label="Téléphone"
                        name="telephone"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                        error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                        helperText={formik.touched.telephone && formik.errors.telephone}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="adresse"
                        label="Adresse"
                        name="adresse"
                        multiline
                        rows={3}
                        value={formik.values.adresse}
                        onChange={formik.handleChange}
                        error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                        helperText={formik.touched.adresse && formik.errors.adresse}
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
                            Modifier
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default VendeurForm; 