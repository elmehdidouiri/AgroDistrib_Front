import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    useTheme,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    ShoppingCart as ProductIcon,
    People as VendeurIcon,
    Person as ProfileIcon,
    ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import Header from './Header';
import Footer from './Footer';

const drawerWidth = 280;

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user } = useSelector((state: RootState) => state.auth);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const menuItems = [
        { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Produits', icon: <ProductIcon />, path: '/produits' },
        { text: 'Vendeurs', icon: <VendeurIcon />, path: '/vendeurs' },
    ];

    const drawer = (
        <Box sx={{ height: '100%', bgcolor: 'background.paper' }}>
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    AgroDistrib
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        sx={{
                            mx: 2,
                            borderRadius: 2,
                            mb: 1,
                            '&:hover': {
                                bgcolor: 'primary.light',
                                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                                    color: 'white',
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: '#f5f5f5',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("/background.jpg")',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4,
                    px: { xs: 2, md: 4 },
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default MainLayout; 