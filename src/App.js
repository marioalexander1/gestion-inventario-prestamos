import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { CustomThemeProvider } from './context/ThemeContext';
import DashboardLayout from './DashboardLayout';
import Login from './components/Login'; 
import { CircularProgress, Box, Avatar, Typography } from '@mui/material';
import { getInitials, stringToColor } from './utils/avatarUtils';
import './styles/Login.css';

// --- Componente de Carga movido aquí ---
function LoginLoadingScreen() {
  const { loggingInUser } = useAuth();
  return (
    <Box className="login-container">
      <Box sx={{ textAlign: 'center', color: 'white' }}>
        {loggingInUser && <Avatar src={loggingInUser.photo} sx={{ width: 100, height: 100, margin: '0 auto 20px', bgcolor: stringToColor(loggingInUser.name || ''), fontSize: '2.5rem' }}>{getInitials(loggingInUser.name)}</Avatar>}
        <Typography variant="h5" gutterBottom>Bienvenido, {loggingInUser?.name || 'Usuario'}</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>Preparando tu espacio de trabajo...</Typography>
        <CircularProgress color="inherit" />
      </Box>
    </Box>
  );
}

function AppContent() {
  const { user, loading, loggingInUser } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (loggingInUser) {
    return <LoginLoadingScreen />;
  }

  return user ? <DashboardLayout /> : <Login />;
}

function App() {
  return (
    <CustomThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </CustomThemeProvider>
  );
}

export default App;
