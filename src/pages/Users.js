import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function Users() {
  const users = [
    { id: 1, name: 'Juan Pérez', role: 'Admin' },
    { id: 2, name: 'María García', role: 'Usuario' },
    { id: 3, name: 'Carlos López', role: 'Usuario' }
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>Usuarios con Acceso</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={`Rol: ${user.role}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Users;