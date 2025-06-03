import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    IconButton,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Inventory as InventoryIcon,
    People as PeopleIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { RootState } from '../../store';
import { fetchProduits, deleteProduit } from '../../store/slices/produitSlice';
import { fetchVendeurs } from '../../store/slices/vendeurSlice';

const StatCard = ({ title, value, icon, color }: any) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
                sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: `${color}.light`,
                    color: `${color}.main`,
                    mr: 2,
                }}
            >
                {icon}
            </Box>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {value}
        </Typography>
    </Paper>
);

const QuickAction = ({ title, description, icon, onClick }: any) => (
    <Card variant="outlined" sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {icon}
                <Typography variant="h6" sx={{ ml: 1 }}>
                    {title}
                </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={onClick}>
                Commencer
            </Button>
        </CardActions>
    </Card>
);

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const { produits } = useSelector((state: RootState) => state.produit);
    const { vendeurs } = useSelector((state: RootState) => state.vendeur);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        dispatch(fetchProduits() as any);
        if (user.role === 'SUPERVISEUR') {
            dispatch(fetchVendeurs() as any);
        }
    }, [dispatch, navigate, user]);

    const handleDeleteProduit = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            dispatch(deleteProduit(id) as any);
        }
    };

    const stats = [
        {
            title: 'Total Produits',
            value: produits.length,
            icon: <InventoryIcon />,
            color: 'primary',
        },
        {
            title: 'Vendeurs Actifs',
            value: vendeurs.length,
            icon: <PeopleIcon />,
            color: 'secondary',
        },
        {
            title: 'Ventes du Mois',
            value: '15,240 DH',
            icon: <TrendingUpIcon />,
            color: 'success',
        },
    ];

    const quickActions = [
        {
            title: 'Nouveau Produit',
            description: 'Ajouter un nouveau produit au catalogue',
            icon: <AddIcon color="primary" />,
            onClick: () => navigate('/produits/nouveau'),
        },
        {
            title: 'Gérer les Vendeurs',
            description: 'Voir et modifier les informations des vendeurs',
            icon: <PeopleIcon color="secondary" />,
            onClick: () => navigate('/vendeurs'),
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                    Tableau de Bord
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <StatCard {...stat} />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
                    Actions Rapides
                </Typography>

                <Grid container spacing={3}>
                    {quickActions.map((action, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <QuickAction {...action} />
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h5" sx={{ my: 3, fontWeight: 500 }}>
                    Derniers Produits
                </Typography>

                <Grid container spacing={2}>
                    {produits.slice(0, 3).map((produit) => (
                        <Grid item xs={12} key={produit.id}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1,
                                            bgcolor: 'primary.light',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                        }}
                                    >
                                        <InventoryIcon sx={{ color: 'primary.main' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1">{produit.nom}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Stock: {produit.quantite} | Prix: {produit.prix} DH
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => navigate(`/produits/${produit.id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        size="small" 
                                        color="error"
                                        onClick={() => handleDeleteProduit(produit.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard; 