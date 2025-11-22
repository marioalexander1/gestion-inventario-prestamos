import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

function InventoryContent({ tools, setTools }) {
  const { hasPermission } = useAuth(); // 1. Obtenemos la función de permisos
  const notification = useNotification();

  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [toolToEdit, setToolToEdit] = useState(null);
  const [toolToDelete, setToolToDelete] = useState(null);

  const handleOpenModal = (tool = null) => {
    setToolToEdit(tool);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setToolToEdit(null);
  };

  const handleOpenDeleteDialog = (tool) => {
    setToolToDelete(tool);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setToolToDelete(null);
  };

  const handleSaveTool = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const toolData = {
      name: formData.get('name'),
      category: formData.get('category'),
      brand: formData.get('brand'),
      totalStock: parseInt(formData.get('totalStock'), 10),
    };

    if (!toolData.name || !toolData.category || !toolData.brand || isNaN(toolData.totalStock)) {
      notification.error('Todos los campos son obligatorios y el stock debe ser un número.');
      return;
    }

    if (toolToEdit) {
      // Editar herramienta
      const updatedTools = tools.map(t =>
        t.id === toolToEdit.id ? { ...toolToEdit, ...toolData, availableStock: toolData.totalStock - (toolToEdit.totalStock - toolToEdit.availableStock) } : t
      );
      setTools(updatedTools);
      notification.success('Herramienta actualizada correctamente.');
    } else {
      // Crear nueva herramienta
      const newTool = {
        id: tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 1,
        ...toolData,
        availableStock: toolData.totalStock,
        status: 'Disponible',
      };
      setTools([...tools, newTool]);
      notification.success('Herramienta creada correctamente.');
    }
    handleCloseModal();
  };

  const handleDeleteTool = () => {
    setTools(tools.filter(t => t.id !== toolToDelete.id));
    notification.success('Herramienta eliminada correctamente.');
    handleCloseDeleteDialog();
  };

  const getStatusChip = (tool) => {
    if (tool.availableStock === 0) {
      return <Chip label="Agotado" color="error" size="small" />;
    }
    if (tool.availableStock < 3) {
      return <Chip label="Bajo Stock" color="warning" size="small" />;
    }
    return <Chip label="Disponible" color="success" size="small" />;
  };

  // Filtrar herramientas
  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Inventario de Herramientas
        </Typography>
        {hasPermission('puede_crear_inventario') && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
            Añadir Herramienta
          </Button>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Buscar Herramienta"
          placeholder="Escribe un nombre, categoría o marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Stock Disponible</TableCell>
              <TableCell>Stock Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTools.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell>{tool.name}</TableCell>
                <TableCell>{tool.category}</TableCell>
                <TableCell>{tool.brand}</TableCell>
                <TableCell>{tool.availableStock}</TableCell>
                <TableCell>{tool.totalStock}</TableCell>
                <TableCell>{getStatusChip(tool)}</TableCell>
                <TableCell align="right">
                  {hasPermission('puede_editar_inventario') && (
                    <IconButton onClick={() => handleOpenModal(tool)} color="primary">
                      <EditIcon />
                    </IconButton>
                  )}
                  {/* 2. Condicionamos la renderización del botón de eliminar */}
                  {hasPermission('puede_eliminar_inventario') && (
                    <IconButton onClick={() => handleOpenDeleteDialog(tool)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para Crear/Editar */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <form onSubmit={handleSaveTool}>
          <DialogTitle>{toolToEdit ? 'Editar Herramienta' : 'Añadir Nueva Herramienta'}</DialogTitle>
          <DialogContent>
            <TextField name="name" label="Nombre" fullWidth margin="dense" defaultValue={toolToEdit?.name || ''} required />
            <TextField name="category" label="Categoría" fullWidth margin="dense" defaultValue={toolToEdit?.category || ''} required />
            <TextField name="brand" label="Marca" fullWidth margin="dense" defaultValue={toolToEdit?.brand || ''} required />
            <TextField name="totalStock" label="Stock Total" type="number" fullWidth margin="dense" defaultValue={toolToEdit?.totalStock || ''} required />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="contained">Guardar</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar la herramienta <strong>{toolToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDeleteTool} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default InventoryContent;