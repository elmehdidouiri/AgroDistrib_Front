import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4B9CD3', // Bleu du logo
            light: '#6FB6E3',
            dark: '#3579B3',
        },
        secondary: {
            main: '#E67E22', // Orange de la vache
            light: '#F39C4D',
            dark: '#C66A1C',
        },
        success: {
            main: '#2ECC71', // Vert pour les produits frais
            light: '#55D98D',
            dark: '#27AE60',
        },
        error: {
            main: '#E74C3C', // Rouge pour les alertes
            light: '#EC7063',
            dark: '#C0392B',
        },
        warning: {
            main: '#F1C40F', // Jaune pour les avertissements
            light: '#F4D03F',
            dark: '#D4AC0D',
        },
        info: {
            main: '#3498DB', // Bleu clair pour les informations
            light: '#5DADE2',
            dark: '#2980B9',
        },
        background: {
            default: '#F5F7FA',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2C3E50',
            secondary: '#7F8C8D',
        },
        divider: 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
            color: '#2C3E50',
        },
        h5: {
            fontWeight: 500,
            color: '#2C3E50',
        },
        h6: {
            fontWeight: 500,
            color: '#2C3E50',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #4B9CD3 30%, #6FB6E3 90%)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #3579B3 30%, #4B9CD3 90%)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(90deg, #4B9CD3 0%, #6FB6E3 100%)',
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
                },
            },
        },
    },
}); 