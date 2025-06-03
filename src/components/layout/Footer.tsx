import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 6,
                mt: 'auto',
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            AgroDistrib
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Votre partenaire de confiance pour la distribution de produits agricoles de qualité.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton color="inherit" size="small">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" size="small">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color="inherit" size="small">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="inherit" size="small">
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Liens Rapides
                        </Typography>
                        <Link href="/produits" color="inherit" display="block" sx={{ mb: 1 }}>
                            Nos Produits
                        </Link>
                        <Link href="/vendeurs" color="inherit" display="block" sx={{ mb: 1 }}>
                            Nos Vendeurs
                        </Link>
                        <Link href="/dashboard" color="inherit" display="block" sx={{ mb: 1 }}>
                            Dashboard
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PhoneIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="body2">+212 5XX-XXXXXX</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmailIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="body2">contact@agrodistrib.ma</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationIcon sx={{ mr: 1 }} fontSize="small" />
                            <Typography variant="body2">123 Rue Agriculture, Casablanca</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} AgroDistrib. Tous droits réservés.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 