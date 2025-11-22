import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from './context/AuthContext';
import { useNotification } from './context/NotificationContext';

const defaultPermissions = {
  puede_crear_inventario: true,
  puede_editar_inventario: true,
  puede_eliminar_inventario: false,
  puede_gestionar_prestamos: true,
};

function UsersContent() {
  const { users, setUsers, user: currentUser } = useAuth();
  const notification = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentUserToEdit, setCurrentUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [permissions, setPermissions] = useState(defaultPermissions);

  useEffect(() => {
    if (currentUserToEdit) {
      setPermissions(currentUserToEdit.permissions || defaultPermissions);
    } else {
      setPermissions(defaultPermissions);
    }
  }, [currentUserToEdit]);

  const handleOpenModal = (user = null) => {
    setCurrentUserToEdit(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentUserToEdit(null);
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSaveUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    if (!userData.username || !userData.name || !userData.role) {
      notification.error('Los campos de nombre, usuario y rol son obligatorios.');
      return;
    }
    
    if (!currentUserToEdit && !userData.password) {
        notification.error('La contraseña es obligatoria para nuevos usuarios.');
        return;
    }

    const finalUserData = {
      ...userData,
      permissions: userData.role === 'admin' ? { ...defaultPermissions, puede_eliminar_inventario: true } : permissions,
    };

    if (currentUserToEdit) {
      const updatedUser = { ...currentUserToEdit, ...finalUserData };
      if (!finalUserData.password) {
        delete updatedUser.password; // No actualiza la contraseña si el campo está vacío
      }
      setUsers(users.map(u => u.id === currentUserToEdit.id ? updatedUser : u));
      notification.success('Usuario actualizado correctamente.');
    } else {
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        ...finalUserData,
      };
      setUsers([...users, newUser]);
      notification.success('Usuario creado correctamente.');
    }
    handleCloseModal();
  };

  const handleDeleteUser = () => {
    if (userToDelete.id === currentUser.id) {
      notification.error('No puedes eliminarte a ti mismo.');
      handleCloseDeleteDialog();
      return;
    }
    setUsers(users.filter(u => u.id !== userToDelete.id));
    notification.success('Usuario eliminado correctamente.');
    handleCloseDeleteDialog();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Crear Usuario
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role === 'admin' ? 'Administrador' : 'Usuario'}
                    color={user.role === 'admin' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenModal(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteDialog(user)} color="error" disabled={user.id === currentUser.id}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <form onSubmit={handleSaveUser}>
          <DialogTitle>{currentUserToEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</DialogTitle>
          <DialogContent>
            <TextField name="name" label="Nombre Completo" fullWidth margin="dense" defaultValue={currentUserToEdit?.name || ''} required />
            <TextField name="username" label="Nombre de Usuario" fullWidth margin="dense" defaultValue={currentUserToEdit?.username || ''} required />
            <TextField name="password" label="Contraseña" type="password" fullWidth margin="dense" placeholder={currentUserToEdit ? 'Dejar en blanco para no cambiar' : ''} required={!currentUserToEdit} />
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Rol</InputLabel>
              <Select name="role" defaultValue={currentUserToEdit?.role || 'user'} label="Rol">
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="user">Usuario</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 2 }}>Permisos</Divider>

            <FormGroup>
              <FormControlLabel control={<Switch checked={permissions.puede_crear_inventario} onChange={handlePermissionChange} name="puede_crear_inventario" />} label="Crear en Inventario" />
              <FormControlLabel control={<Switch checked={permissions.puede_editar_inventario} onChange={handlePermissionChange} name="puede_editar_inventario" />} label="Editar Inventario" />
              <FormControlLabel control={<Switch checked={permissions.puede_eliminar_inventario} onChange={handlePermissionChange} name="puede_eliminar_inventario" />} label="Eliminar de Inventario" />
              <FormControlLabel control={<Switch checked={permissions.puede_gestionar_prestamos} onChange={handlePermissionChange} name="puede_gestionar_prestamos" />} label="Gestionar Préstamos" />
            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained">{currentUserToEdit ? 'Guardar Cambios' : 'Crear Usuario'}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar al usuario <strong>{userToDelete?.name}</strong>? Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDeleteUser} variant="contained" color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default UsersContent;