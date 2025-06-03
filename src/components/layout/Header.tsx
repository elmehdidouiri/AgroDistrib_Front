import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Tooltip,
    MenuItem,
    Button,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../types';

const pages = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'Produits', path: '/produits', icon: <InventoryIcon /> },
    { title: 'Vendeurs', path: '/vendeurs', icon: <PeopleIcon /> },
];

const Header = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
        handleCloseUserMenu();
    };

    return (
        <AppBar 
            position="static" 
            sx={{
                background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo */}
                    <Box
                        component="img"
                        src="/logo.svg"
                        sx={{
                            height: { xs: 32, md: 40 },
                            mr: 2,
                            cursor: 'pointer'
                        }}
                        alt="AgroDistrib Logo"
                        onClick={() => navigate('/dashboard')}
                    />

                    {/* Menu mobile */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.path} onClick={() => handleNavigate(page.path)}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {page.icon}
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Menu desktop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.path}
                                onClick={() => handleNavigate(page.path)}
                                sx={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                {page.icon}
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    {/* Menu utilisateur */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Paramètres">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar 
                                    alt={user?.nom || 'User'} 
                                    src="/avatar.png"
                                    sx={{ 
                                        bgcolor: 'secondary.main',
                                        border: '2px solid white',
                                    }}
                                >
                                    {user?.nom?.[0] || 'U'}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Déconnexion</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 