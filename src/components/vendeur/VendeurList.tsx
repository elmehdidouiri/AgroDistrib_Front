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
    Tooltip,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import { User } from '../../types';

interface VendeurListProps {
    vendeurs: User[];
    onDelete?: (id: number) => void;
}

const VendeurList: React.FC<VendeurListProps> = ({ vendeurs, onDelete }) => {
    const navigate = useNavigate();

    if (!vendeurs || vendeurs.length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                    Aucun vendeur disponible
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
                        <TableCell>Email</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Adresse</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vendeurs.map((vendeur) => (
                        <TableRow key={vendeur.id} hover>
                            <TableCell>{vendeur.fullName || vendeur.nom}</TableCell>
                            <TableCell>{vendeur.email}</TableCell>
                            <TableCell>{vendeur.telephone}</TableCell>
                            <TableCell>{vendeur.adresse}</TableCell>
                            <TableCell align="center">
                                <Tooltip title="Voir les détails">
                                    <IconButton
                                        size="small"
                                        color="info"
                                        onClick={() => navigate(`/vendeurs/${vendeur.id}`)}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Modifier">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => navigate(`/vendeurs/${vendeur.id}/edit`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                {onDelete && (
                                    <Tooltip title="Supprimer">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => onDelete(vendeur.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VendeurList; 