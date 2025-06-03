import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { login } from '../../store/slices/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await dispatch(login({ email, password }) as any);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #4B9CD3 0%, #2C5282 100%)',
                py: 3,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    zIndex: 1,
                },
            }}
        >
            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(43, 89, 147, 0.15)',
                        border: '1px solid rgba(75, 156, 211, 0.1)',
                    }}
                >
                    <Box
                        component="img"
                        src="/logo.svg"
                        alt="AgroDistrib Logo"
                        sx={{
                            width: 120,
                            height: 120,
                            mb: 2,
                        }}
                    />

                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            color: '#4B9CD3',
                            textAlign: 'center',
                            mb: 3,
                        }}
                    >
                        Bienvenue
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            textAlign: 'center',
                            mb: 4,
                        }}
                    >
                        Connectez-vous pour accéder à votre espace de gestion
                    </Typography>

                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ 
                                width: '100%', 
                                mb: 3,
                                borderRadius: 2,
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#4B9CD3' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: '#4B9CD3',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4B9CD3',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#6E9DC5',
                                    '&.Mui-focused': {
                                        color: '#4B9CD3',
                                    },
                                },
                            }}
                        />

                        <TextField
                            required
                            fullWidth
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#4B9CD3' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{
                                                color: '#4B9CD3',
                                                '&:hover': {
                                                    color: '#2C5282',
                                                },
                                            }}
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: '#4B9CD3',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#4B9CD3',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#6E9DC5',
                                    '&.Mui-focused': {
                                        color: '#4B9CD3',
                                    },
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                mt: 2,
                                borderRadius: 2,
                                position: 'relative',
                                bgcolor: '#4B9CD3',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: '#2C5282',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(43, 89, 147, 0.2)',
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            ) : (
                                'Se connecter'
                            )}
                        </Button>
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{
                            mt: 4,
                            color: '#6E9DC5',
                            textAlign: 'center',
                            fontWeight: 500,
                        }}
                    >
                        © {new Date().getFullYear()} AgroDistrib. Tous droits réservés.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login; 