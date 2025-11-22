import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar, // Renombramos para evitar conflictos
  Typography,
  CssBaseline,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PrintIcon from '@mui/icons-material/Print';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';
// Importa componentes separados
import InventoryContent from './components/InventoryContent';
import LoansContent from './components/LoansContent';
import ReportsContent from './components/ReportsContent';
import GenerateReportsContent from './components/GenerateReportsContent';
import HistoryContent from './components/HistoryContent';
import UsersContent from './UsersContent';

// Importar contexto y utilidades
import { useAuth } from './context/AuthContext';
import { useNotification } from './context/NotificationContext';
import { saveTools, loadTools, saveLoans, loadLoans } from './utils/localStorage';
import { stringToColor, getInitials } from './utils/avatarUtils';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function DashboardLayout() {
  const { user, logout, updateUserProfile } = useAuth();
  const notification = useNotification();
  const [selectedSection, setSelectedSection] = useState('inventory');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Estado global para herramientas y préstamos (compartido)
  const [tools, setTools] = useState([]);
  const [loans, setLoans] = useState([]);

  const allMenuItems = [
    { text: 'Inventario', icon: <InventoryIcon />, key: 'inventory' },
    { text: 'Préstamos', icon: <AssignmentIcon />, key: 'loans' },
    { text: 'Historial', icon: <HistoryIcon />, key: 'history' },
    { text: 'Usuarios', icon: <GroupIcon />, key: 'users', adminOnly: true },
    { text: 'Reportes', icon: <AssessmentIcon />, key: 'reports' },
    { text: 'Generar Reportes', icon: <PrintIcon />, key: 'generate-reports' },
    { text: 'Cerrar Sesión', icon: <LogoutIcon />, key: 'logout' },
  ];

  const menuItems = allMenuItems.filter(item => !item.adminOnly || (item.adminOnly && user?.role === 'admin'));

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const savedTools = loadTools();
    const savedLoans = loadLoans();
    setTools(savedTools);
    setLoans(savedLoans);
    notification.success('Datos cargados correctamente');
  }, []);

  // Guardar herramientas cuando cambien
  useEffect(() => {
    saveTools(tools);
  }, [tools]);

  // Guardar préstamos cuando cambien
  useEffect(() => {
    saveLoans(loans);
  }, [loans]);

  const handleMenuClick = (key) => {
    if (key === 'logout') {
      setLogoutDialogOpen(true);
    } else {
      setSelectedSection(key);
    }
  };

  const handleLogout = () => {
    logout();
    notification.success('Sesión cerrada correctamente');
    setLogoutDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Photo = e.target.result;
        updateUserProfile({ photo: base64Photo });
        notification.success('Foto de perfil actualizada.');
        setPhotoModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawer = (
    <div style={{ height: '100%' }}>
      <Toolbar />
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <IconButton onClick={() => setPhotoModalOpen(true)} sx={{ p: 0, mb: 1 }}>
          <Avatar 
            src={user?.photo}
            sx={{
              width: 64,
              height: 64,
              bgcolor: stringToColor(user?.name || ''),
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
            }}
          >
            {getInitials(user?.name)}
          </Avatar>
        </IconButton>
        <Typography noWrap sx={{ opacity: isDrawerOpen ? 1 : 0, transition: 'opacity 0.3s' }}>{user?.name || 'Usuario'}</Typography>
      </Toolbar>
      <List>
        {menuItems.map(({ text, icon, key }) => (
          <ListItem key={key} disablePadding>
            <ListItemButton
              selected={selectedSection === key}
              onClick={() => handleMenuClick(key)}
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? 'initial' : 'center',
                px: 2.5,
                '&:hover': { bgcolor: '#34495e' },
                '&.Mui-selected': {
                  bgcolor: '#34495e',
                  '&:hover': { bgcolor: '#34495e' },
                },
                ...(key === 'logout' && {
                  '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.2)' },
                  color: '#d32f2f',
                  '& .MuiListItemIcon-root': {
                    color: '#d32f2f',
                  },
                }),
              }}
            >
            <ListItemIcon sx={{ minWidth: 0, mr: isDrawerOpen ? 3 : 'auto', justifyContent: 'center', color: '#56CCF2' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />  
            </ListItemButton>
          </ListItem> 
        ))}
      </List>
    </div>
  );


  const renderContent = () => {
    switch (selectedSection) {
      case 'inventory':
        return <InventoryContent tools={tools} setTools={setTools} />;
      case 'loans':
        return <LoansContent tools={tools} setTools={setTools} loans={loans} setLoans={setLoans} />;
      case 'users':
        return <UsersContent />;
      case 'history':
        return <HistoryContent loans={loans} setLoans={setLoans} />;
      case 'reports':
        return <ReportsContent />;
      case 'generate-reports':
        return <GenerateReportsContent tools={tools} loans={loans} />;
      default:
        return <InventoryContent tools={tools} setTools={setTools} />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen} sx={{ bgcolor: '#6C5CE7' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Sistema de Herramientas y Préstamos</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={user?.photo} sx={{ bgcolor: stringToColor(user?.name || ''), width: 32, height: 32, fontSize: '0.8rem' }}>
              {getInitials(user?.name)}
            </Avatar>
            <Typography>{user?.name || 'Usuario'}</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <CustomDrawer
        variant="permanent"
        open={isDrawerOpen}
        onMouseEnter={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        PaperProps={{ sx: { bgcolor: '#212F3D', color: '#BBE1FA' } }}
      >
        {drawer}
      </CustomDrawer>

      <Box 
        component="main" 
        sx={(theme) => ({ 
          flexGrow: 1, bgcolor: '#F4F6F8', p: 3, mt: 8 
        })}
      >
        {renderContent()}
      </Box>

      {/* Diálogo de confirmación de logout */}
      <Dialog open={logoutDialogOpen} onClose={handleCancelLogout}>
        <DialogTitle>Cerrar Sesión</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas cerrar sesión?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout}>Cancelar</Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para cambiar foto */}
      <Dialog open={photoModalOpen} onClose={() => setPhotoModalOpen(false)}>
        <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Selecciona una nueva imagen para tu perfil.
          </Typography>
          <Button variant="contained" component="label">
            Subir Archivo
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </Button>
        </DialogContent>
        <DialogActions><Button onClick={() => setPhotoModalOpen(false)}>Cancelar</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
