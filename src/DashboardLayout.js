import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Typography,
  CssBaseline,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PrintIcon from '@mui/icons-material/Print';
import HistoryIcon from '@mui/icons-material/History';
import GroupIcon from '@mui/icons-material/Group';
// Importa componentes separados
import InventoryContent from './components/InventoryContent';
import LoansContent from './components/LoansContent';
import ReportsContent from './components/ReportsContent';
import AlertsContent from './components/AlertsContent';
import GenerateReportsContent from './components/GenerateReportsContent';
import HistoryContent from './components/HistoryContent';
import UsersContent from './UsersContent';

// Importar contexto y utilidades
import { useAuth } from './context/AuthContext';
import { useNotification } from './context/NotificationContext';
import { saveTools, loadTools, saveLoans, loadLoans } from './utils/localStorage';

const drawerWidth = 240;

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const notification = useNotification();
  const [selectedSection, setSelectedSection] = useState('inventory');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Estado global para herramientas y préstamos (compartido)
  const [tools, setTools] = useState([]);
  const [loans, setLoans] = useState([]);

  const allMenuItems = [
    { text: 'Inventario', icon: <InventoryIcon />, key: 'inventory' },
    { text: 'Préstamos', icon: <AssignmentIcon />, key: 'loans' },
    { text: 'Historial', icon: <HistoryIcon />, key: 'history' },
    { text: 'Usuarios', icon: <GroupIcon />, key: 'users', adminOnly: true },
    { text: 'Reportes', icon: <AssessmentIcon />, key: 'reports' },
    { text: 'Notificaciones', icon: <NotificationsIcon />, key: 'alerts' },
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
    if (tools.length > 0) {
      saveTools(tools);
    }
  }, [tools]);

  // Guardar préstamos cuando cambien
  useEffect(() => {
    if (loans.length > 0) {
      saveLoans(loans);
    }
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

  const drawer = (
    <div style={{ backgroundColor: '#212F3D', height: '100%', color: '#BBE1FA' }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: '#6C5CE7' }}>
          {user?.name?.charAt(0) || 'U'}
        </Avatar>
        <Typography>{user?.name || 'Usuario'}</Typography>
        <Typography color="success.main" fontSize={12}>Online</Typography>
      </Toolbar>
      <List>
        {menuItems.map(({ text, icon, key }) => (
          <ListItem key={key} disablePadding>
            <ListItemButton
              selected={selectedSection === key}
              onClick={() => handleMenuClick(key)}
              sx={{
                '&:hover': { bgcolor: '#34495e' },
                '&.Mui-selected': {
                  bgcolor: '#34495e',
                  '&:hover': { bgcolor: '#34495e' },
                },
              }}
            >
            <ListItemIcon sx={{ color: '#56CCF2' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />  
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
        return <HistoryContent loans={loans} />;
      case 'reports':
        return <ReportsContent tools={tools} loans={loans} />;
      case 'alerts':
        return <AlertsContent tools={tools} loans={loans} />;
      case 'generate-reports':
        return <GenerateReportsContent tools={tools} loans={loans} />;
      default:
        return <InventoryContent tools={tools} setTools={setTools} />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#6C5CE7' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Sistema de Herramientas y Préstamos</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: '#5B4BC7' }}>
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Typography>{user?.name || 'Usuario'}</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#212F3D', color: '#BBE1FA' }
        }}
        open
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F4F6F8', p: 3, mt: 8 }}>
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
    </Box>
  );
}
