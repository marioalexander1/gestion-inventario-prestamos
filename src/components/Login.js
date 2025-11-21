import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const result = login(username, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="login-container">
      <Paper className="login-paper" elevation={6}>
        <Box className="login-header">
          <LoginIcon sx={{ fontSize: 48, color: '#6C5CE7', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Sistema de Gestión
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Inventario y Préstamos
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            autoFocus
          />

          <TextField
            fullWidth
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{
              bgcolor: '#6C5CE7',
              '&:hover': { bgcolor: '#5B4BC7' },
              mb: 2,
            }}
          >
            Iniciar Sesión
          </Button>

          <Box className="login-demo-info">
            <Typography variant="caption" color="textSecondary" align="center">
              <strong>Usuarios de prueba:</strong>
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center">
              admin / admin123 | obed_alvarado / obed123 | usuario / usuario123
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
