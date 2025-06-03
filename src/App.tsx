import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { Box, Typography, Button, Container } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store';
import { theme } from './theme';
import MainLayout from './components/layout/MainLayout';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ProduitList from './components/produit/ProduitList';
import ProduitForm from './components/produit/ProduitForm';
import VendeurList from './components/vendeur/VendeurList';
import VendeurFormWrapper from './components/vendeur/VendeurFormWrapper';
import { fetchProduits, deleteProduit } from './store/slices/produitSlice';
import { fetchVendeurs, deleteVendeur } from './store/slices/vendeurSlice';
import type { RootState } from './types/index';

// Composant conteneur pour gérer la logique de la liste des produits
const ProduitListContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { produits } = useSelector((state: RootState) => state.produit);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchProduits() as any);
    }, [dispatch]);

    const handleDeleteProduit = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            dispatch(deleteProduit(id) as any);
        }
    };

    return (
        <Container>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gestion des Produits
                </Typography>
                {user?.role === 'SUPERVISEUR' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/produits/nouveau')}
                        startIcon={<AddIcon />}
                        sx={{ mb: 2 }}
                    >
                        Nouveau Produit
                    </Button>
                )}
                <ProduitList
                    produits={produits}
                    isSuperviseur={user?.role === 'SUPERVISEUR'}
                    onDelete={handleDeleteProduit}
                />
            </Box>
        </Container>
    );
};

// Composant conteneur pour gérer la logique de la liste des vendeurs
const VendeurListContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vendeurs } = useSelector((state: RootState) => state.vendeur);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchVendeurs() as any);
    }, [dispatch]);

    const handleDeleteVendeur = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce vendeur ?')) {
            dispatch(deleteVendeur(id) as any);
        }
    };

    return (
        <Container>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gestion des Vendeurs
                </Typography>
                {user?.role === 'SUPERVISEUR' && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/vendeurs/nouveau')}
                        startIcon={<AddIcon />}
                        sx={{ mb: 2 }}
                    >
                        Nouveau Vendeur
                    </Button>
                )}
                <VendeurList
                    vendeurs={vendeurs}
                    onDelete={handleDeleteVendeur}
                />
            </Box>
        </Container>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <MainLayout>
                                        <Dashboard />
                                    </MainLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/produits"
                            element={
                                <PrivateRoute>
                                    <MainLayout>
                                        <ProduitListContainer />
                                    </MainLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/produits/nouveau"
                            element={
                                <PrivateRoute>
                                    <MainLayout>
                                        <ProduitForm />
                                    </MainLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/produits/:id"
                            element={
                                <PrivateRoute>
                                    <MainLayout>
                                        <ProduitForm isEdit />
                                    </MainLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/vendeurs"
                            element={
                                <PrivateRoute>
                                    <MainLayout>
                                        <VendeurListContainer />
                                    </MainLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/vendeurs/nouveau"
                            element={
                                <PrivateRoute>
                                    <MainLayout>
                                        <VendeurFormWrapper />
                                    </MainLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/vendeurs/:id"
                            element={
                                <PrivateRoute>
                                    <MainLayout>
                                        <VendeurFormWrapper />
                                    </MainLayout>
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </Routes>
                </Router>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </ThemeProvider>
        </Provider>
    );
};

export default App; 