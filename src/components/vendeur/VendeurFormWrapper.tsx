import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Container } from '@mui/material';
import { vendeurService } from '../../services/api';
import VendeurForm from './VendeurForm';
import { User } from '../../types';

const VendeurFormWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vendeur, setVendeur] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendeur = async () => {
            try {
                if (id) {
                    const response = await vendeurService.getById(parseInt(id));
                    setVendeur(response.data);
                }
            } catch (error) {
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchVendeur();
    }, [id, navigate]);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!vendeur) {
        return null;
    }

    return <VendeurForm vendeur={vendeur} />;
};

export default VendeurFormWrapper; 