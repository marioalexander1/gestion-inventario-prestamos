import React, { useState } from 'react';
import { Box, Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, AppBar, Typography, CssBaseline, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PrintIcon from '@mui/icons-material/Print';

// Importa componentes separados
import InventoryContent from './components/InventoryContent';
import LoansContent from './components/LoansContent';
import ReportsContent from './components/ReportsContent';
import AlertsContent from './components/AlertsContent';
import GenerateReportsContent from './components/GenerateReportsContent';

const drawerWidth = 240;

const menuItems = [
  { text: 'Cierre de sesión', icon: <LogoutIcon />, key: 'logout' },
  { text: 'Inventario existente', icon: <InventoryIcon />, key: 'inventory' },
  { text: 'Préstamos activos', icon: <AssignmentIcon />, key: 'loans' },
  { text: 'Reportes', icon: <AssessmentIcon />, key: 'reports' },
  { text: 'notificaciones', icon: <NotificationsIcon />, key: 'alerts' },
  { text: 'Generar reportes', icon: <PrintIcon />, key: 'generate-reports' },
];

export default function DashboardLayout() {
  const [selectedSection, setSelectedSection] = useState('inventory');

  // Estado global para herramientas y préstamos (compartido)
  const [tools, setTools] = useState([
    { id: 1, name: 'Martillo', category: 'Herramientas Manuales', brand: 'Stanley', availableStock: 8, totalStock: 10, status: 'Disponible' },
    { id: 2, name: 'Destornillador', category: 'Herramientas Manuales', brand: 'Bosch', availableStock: 2, totalStock: 5, status: 'Bajo Stock' },
    { id: 3, name: 'Taladro', category: 'Herramientas Eléctricas', brand: 'Makita', availableStock: 5, totalStock: 5, status: 'Disponible' },
  ]);

  const [loans, setLoans] = useState([
    { id: 1, user: 'Juan Pérez', toolId: 1, toolName: 'Martillo', loanDate: '2023-10-01', returnDate: '2023-10-15', status: 'Activo' },
    { id: 2, user: 'María García', toolId: 3, toolName: 'Taladro', loanDate: '2023-10-05', returnDate: '2023-10-20', status: 'Activo' },
  ]);

  const handleMenuClick = (key) => {
    setSelectedSection(key);
  };

  const drawer = (
    <div style={{ backgroundColor: '#212F3D', height: '100%', color: '#BBE1FA' }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar sx={{ width: 64, height: 64, mb: 1 }}>OA</Avatar>
        <Typography>obed_alvarado</Typography>
        <Typography color="success.main" fontSize={12}>Online</Typography>
      </Toolbar>
      <List>
        {menuItems.map(({ text, icon, key }) => (
          <ListItem button key={key} onClick={() => handleMenuClick(key)} sx={{ bgcolor: selectedSection === key ? '#34495e' : 'transparent' }}>
            <ListItemIcon sx={{ color: '#56CCF2' }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderContent = () => {
    switch (selectedSection) {
      case 'logout':
        return (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h5" gutterBottom>¿Estás seguro de cerrar sesión?</Typography>
            <Typography variant="body1" color="error">Funcionalidad pendiente (integrar autenticación).</Typography>
          </Box>
        );
      case 'inventory':
        return <InventoryContent tools={tools} setTools={setTools} />;
      case 'loans':
        return <LoansContent tools={tools} setTools={setTools} loans={loans} setLoans={setLoans} />;
      case 'reports':
          return <ReportsContent tools={tools} loans={loans} />;
      case 'alerts':
          return <AlertsContent tools={tools} loans={loans} />;
      case 'generate-reports':
        return <GenerateReportsContent />;
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
            <Avatar>OA</Avatar>
            <Typography>obed_alvarado</Typography>
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
    </Box>
  );
}