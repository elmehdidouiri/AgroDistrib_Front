import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Typography,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Produit } from '../../types';

interface ProduitListProps {
    produits: Produit[];
    isSuperviseur: boolean;
    onDelete?: (id: number) => void;
}

const ProduitList: React.FC<ProduitListProps> = ({ produits, isSuperviseur, onDelete }) => {
    const navigate = useNavigate();

    if (!produits || produits.length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                    Aucun produit disponible
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Famille</TableCell>
                        <TableCell align="right">Prix (DH)</TableCell>
                        <TableCell align="right">Quantité</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {produits.map((produit) => (
                        <TableRow key={produit.id} hover>
                            <TableCell>{produit.nom}</TableCell>
                            <TableCell>{produit.familleProduit}</TableCell>
                            <TableCell align="right">{produit.prix.toFixed(2)} DH</TableCell>
                            <TableCell align="right">{produit.quantite}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => navigate(`/produits/${produit.id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete && onDelete(produit.id!)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProduitList; 