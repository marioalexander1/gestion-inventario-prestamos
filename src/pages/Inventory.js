import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography } from '@mui/material';

function Inventory() {
  const [tools, setTools] = useState([
    { id: 1, name: 'Martillo', quantity: 10, status: 'Disponible' },
    { id: 2, name: 'Destornillador', quantity: 5, status: 'En Préstamo' }
  ]);
  const [newTool, setNewTool] = useState({ name: '', quantity: 0 });

  const addTool = () => {
    setTools([...tools, { ...newTool, id: tools.length + 1, status: 'Disponible' }]);
    setNewTool({ name: '', quantity: 0 });
  };

  const handleLoan = (id) => {
    setTools(tools.map(tool => tool.id === id ? { ...tool, status: 'En Préstamo', quantity: tool.quantity - 1 } : tool));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Inventario de Herramientas</Typography>
      
      {/* Formulario para ingresar nueva herramienta */}
      <Typography variant="h6">Ingresar Nueva Herramienta</Typography>
      <TextField label="Nombre" value={newTool.name} onChange={(e) => setNewTool({ ...newTool, name: e.target.value })} />
      <TextField label="Cantidad" type="number" value={newTool.quantity} onChange={(e) => setNewTool({ ...newTool, quantity: parseInt(e.target.value) })} />
      <Button variant="contained" onClick={addTool} sx={{ ml: 2 }}>Agregar</Button>
      
      {/* Tabla de inventario */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tools.map(tool => (
              <TableRow key={tool.id}>
                <TableCell>{tool.name}</TableCell>
                <TableCell>{tool.quantity}</TableCell>
                <TableCell>{tool.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleLoan(tool.id)}>Prestar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Inventory;