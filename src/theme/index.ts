import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2E7D32', // Vert forêt pour l'identité agricole
            light: '#4CAF50',
            dark: '#1B5E20',
        },
        secondary: {
            main: '#FFA000', // Orange doré pour l'accent
            light: '#FFB74D',
            dark: '#F57C00',
        },
        background: {
            default: '#F5F7FA',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2D3748',
            secondary: '#4A5568',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#2D3748',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#2D3748',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            color: '#2D3748',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#2D3748',
        },
        body1: {
            fontSize: '1rem',
            color: '#4A5568',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '8px 24px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
}); 