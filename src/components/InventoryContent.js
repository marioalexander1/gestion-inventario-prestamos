import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/InventoryContent.css'; // Import corregido

function InventoryContent({ tools, setTools }) {
  const [openModal, setOpenModal] = useState(false);
  const [newTool, setNewTool] = useState({ name: '', category: '', brand: '', totalStock: 0 });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewTool({ name: '', category: '', brand: '', totalStock: 0 });
  };

  const handleAddTool = () => {
    if (newTool.name && newTool.category && newTool.brand && newTool.totalStock > 0) {
      const newId = tools.length + 1;
      const newRow = {
        id: newId,
        name: newTool.name,
        category: newTool.category,
        brand: newTool.brand,
        availableStock: newTool.totalStock,
        totalStock: newTool.totalStock,
        status: newTool.totalStock > 2 ? 'Disponible' : 'Bajo Stock',
      };
      setTools([...tools, newRow]);
      handleCloseModal();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200, filterable: true },
    { field: 'category', headerName: 'Categoría de herramienta', width: 200 },
    { field: 'brand', headerName: 'Marca de herramienta', width: 150 },
    { field: 'availableStock', headerName: 'Stock disponible', width: 150, type: 'number' },
    { field: 'totalStock', headerName: 'Stock total', width: 120, type: 'number' },
    {
      field: 'status',
      headerName: 'Estado',
      width: 150,
      renderCell: (params) => (
        <Box className={params.value === 'Disponible' ? 'status-available' : 'status-low-stock'}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => alert(`Editar ${params.row.name}`)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Inventario Existente
      </Typography>
      <Paper className="inventory-table">
        <DataGrid
          rows={tools}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
      <Box className="inventory-buttons">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Agregar Nueva Herramienta
        </Button>
        <Button variant="outlined" color="secondary">
          Exportar a Excel
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="inventory-modal">
          <Typography variant="h6" gutterBottom>
            Agregar Nueva Herramienta
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={newTool.name}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Categoría de herramienta</InputLabel>
            <Select
              value={newTool.category}
              onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
            >
              <MenuItem value="Herramientas Manuales">Herramientas Manuales</MenuItem>
              <MenuItem value="Herramientas Eléctricas">Herramientas Eléctricas</MenuItem>
              <MenuItem value="Herramientas de Medición">Herramientas de Medición</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Marca de herramienta"
            value={newTool.brand}
            onChange={(e) => setNewTool({ ...newTool, brand: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Stock Total"
            type="number"
            value={newTool.totalStock}
            onChange={(e) => setNewTool({ ...newTool, totalStock: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="contained" onClick={handleAddTool}>
              Agregar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default InventoryContent;