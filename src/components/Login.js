import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, InputAdornment, IconButton, Avatar } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, users } = useAuth();

  const handleUsernameBlur = () => {
    if (username) {
      const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
      setUserPhoto(foundUser?.photo || null);
    } else {
      setUserPhoto(null);
    }
  };

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          {userPhoto ? (
            <Avatar src={userPhoto} sx={{ width: 80, height: 80, mb: 2 }} />
          ) : (
            <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: '#6C5CE7' }}>
              <LoginIcon sx={{ fontSize: 48 }} />
            </Avatar>
          )}
          <Typography variant="h4" gutterBottom>
            Bienvenido
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Inicia sesión para continuar
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
            onBlur={handleUsernameBlur}
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
