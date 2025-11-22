import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Alert, InputAdornment, IconButton, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { stringToColor, getInitials } from '../utils/avatarUtils';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [userNameForAvatar, setUserNameForAvatar] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, users } = useAuth();

  const handleUserChange = (event) => {
    const selectedUsername = event.target.value;
    setUsername(selectedUsername);

    if (selectedUsername) {
      const foundUser = users.find(u => u.username === selectedUsername);
      setUserNameForAvatar(foundUser?.name || '');
      setUserPhoto(foundUser?.photo || null);
    } else {
      setUserPhoto(null);
      setUserNameForAvatar('');
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
            <Avatar
              key={userNameForAvatar}
              src={userPhoto}
              className="login-avatar"
              sx={{ width: 80, height: 80, mb: 2 }}
            />
          ) : (
            <Avatar
              key={userNameForAvatar || 'default'}
              className="login-avatar"
              sx={{ width: 80, height: 80, mb: 2, bgcolor: stringToColor(userNameForAvatar), fontSize: '2rem' }}
            >
              {userNameForAvatar ? getInitials(userNameForAvatar) : <LoginIcon sx={{ fontSize: 48 }} />}
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

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} className="form-field-1">
            <InputLabel>Usuario</InputLabel>
            <Select
              value={username}
              onChange={handleUserChange}
              label="Usuario"
              autoFocus
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.username}>{user.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField className="form-field-2"
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

          <Button className="form-field-3"
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
