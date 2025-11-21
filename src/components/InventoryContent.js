import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNotification } from '../context/NotificationContext';
import { exportToolsToExcel } from '../utils/exportUtils';
import '../styles/InventoryContent.css';

function InventoryContent({ tools, setTools }) {
  const notification = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [newTool, setNewTool] = useState({ name: '', category: '', brand: '', totalStock: 0 });
  const [editTool, setEditTool] = useState({ name: '', category: '', brand: '', totalStock: 0, availableStock: 0 });
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewTool({ name: '', category: '', brand: '', totalStock: 0 });
  };

  const handleOpenEditModal = (tool) => {
    setSelectedTool(tool);
    setEditTool({
      name: tool.name,
      category: tool.category,
      brand: tool.brand,
      totalStock: tool.totalStock,
      availableStock: tool.availableStock,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedTool(null);
    setEditTool({ name: '', category: '', brand: '', totalStock: 0, availableStock: 0 });
  };

  const handleOpenDeleteDialog = (tool) => {
    setSelectedTool(tool);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedTool(null);
  };

  const handleAddTool = () => {
    // Validaciones
    if (!newTool.name.trim()) {
      notification.error('El nombre de la herramienta es obligatorio');
      return;
    }
    if (!newTool.category) {
      notification.error('Debes seleccionar una categoría');
      return;
    }
    if (!newTool.brand.trim()) {
      notification.error('La marca es obligatoria');
      return;
    }
    if (newTool.totalStock <= 0) {
      notification.error('El stock total debe ser mayor a 0');
      return;
    }

    setLoading(true);
    
    // Simular delay de carga
    setTimeout(() => {
      const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 1;
      const newRow = {
        id: newId,
        name: newTool.name.trim(),
        category: newTool.category,
        brand: newTool.brand.trim(),
        availableStock: newTool.totalStock,
        totalStock: newTool.totalStock,
        status: newTool.totalStock > 2 ? 'Disponible' : 'Bajo Stock',
      };
      setTools([...tools, newRow]);
      notification.success(`Herramienta "${newTool.name}" agregada exitosamente`);
      handleCloseModal();
      setLoading(false);
    }, 500);
  };

  const handleEditTool = () => {
    // Validaciones
    if (!editTool.name.trim()) {
      notification.error('El nombre de la herramienta es obligatorio');
      return;
    }
    if (!editTool.category) {
      notification.error('Debes seleccionar una categoría');
      return;
    }
    if (!editTool.brand.trim()) {
      notification.error('La marca es obligatoria');
      return;
    }
    if (editTool.totalStock <= 0) {
      notification.error('El stock total debe ser mayor a 0');
      return;
    }
    if (editTool.availableStock < 0) {
      notification.error('El stock disponible no puede ser negativo');
      return;
    }
    if (editTool.availableStock > editTool.totalStock) {
      notification.error('El stock disponible no puede ser mayor al stock total');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const updatedTools = tools.map((tool) =>
        tool.id === selectedTool.id
          ? {
              ...tool,
              name: editTool.name.trim(),
              category: editTool.category,
              brand: editTool.brand.trim(),
              totalStock: editTool.totalStock,
              availableStock: editTool.availableStock,
              status: editTool.availableStock > 2 ? 'Disponible' : 'Bajo Stock',
            }
          : tool
      );
      setTools(updatedTools);
      notification.success(`Herramienta "${editTool.name}" actualizada exitosamente`);
      handleCloseEditModal();
      setLoading(false);
    }, 500);
  };

  const handleDeleteTool = () => {
    setLoading(true);

    setTimeout(() => {
      const updatedTools = tools.filter((tool) => tool.id !== selectedTool.id);
      setTools(updatedTools);
      notification.success(`Herramienta "${selectedTool.name}" eliminada exitosamente`);
      handleCloseDeleteDialog();
      setLoading(false);
    }, 500);
  };

  const handleExportExcel = () => {
    const success = exportToolsToExcel(tools);
    if (success) {
      notification.success('Inventario exportado a Excel exitosamente');
    } else {
      notification.error('Error al exportar el inventario');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 180, filterable: true },
    { field: 'category', headerName: 'Categoría', width: 180 },
    { field: 'brand', headerName: 'Marca', width: 130 },
    { field: 'availableStock', headerName: 'Stock Disp.', width: 120, type: 'number' },
    { field: 'totalStock', headerName: 'Stock Total', width: 120, type: 'number' },
    {
      field: 'status',
      headerName: 'Estado',
      width: 130,
      renderCell: (params) => (
        <Box className={params.value === 'Disponible' ? 'status-available' : 'status-low-stock'}>
          {params.value}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Editar">
            <IconButton size="small" color="primary" onClick={() => handleOpenEditModal(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton size="small" color="error" onClick={() => handleOpenDeleteDialog(params.row)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
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
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
        />
      </Paper>
      <Box className="inventory-buttons">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Agregar Nueva Herramienta
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleExportExcel}>
          Exportar a Excel
        </Button>
      </Box>

      {/* Modal Agregar */}
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
            required
          />
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Categoría de herramienta</InputLabel>
            <Select
              value={newTool.category}
              label="Categoría de herramienta"
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
            required
          />
          <TextField
            fullWidth
            label="Stock Total"
            type="number"
            value={newTool.totalStock}
            onChange={(e) => setNewTool({ ...newTool, totalStock: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2 }}
            required
            inputProps={{ min: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseModal} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleAddTool} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Agregar'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal Editar */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box className="inventory-modal">
          <Typography variant="h6" gutterBottom>
            Editar Herramienta
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={editTool.name}
            onChange={(e) => setEditTool({ ...editTool, name: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Categoría de herramienta</InputLabel>
            <Select
              value={editTool.category}
              label="Categoría de herramienta"
              onChange={(e) => setEditTool({ ...editTool, category: e.target.value })}
            >
              <MenuItem value="Herramientas Manuales">Herramientas Manuales</MenuItem>
              <MenuItem value="Herramientas Eléctricas">Herramientas Eléctricas</MenuItem>
              <MenuItem value="Herramientas de Medición">Herramientas de Medición</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Marca de herramienta"
            value={editTool.brand}
            onChange={(e) => setEditTool({ ...editTool, brand: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Stock Total"
            type="number"
            value={editTool.totalStock}
            onChange={(e) => setEditTool({ ...editTool, totalStock: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2 }}
            required
            inputProps={{ min: 1 }}
          />
          <TextField
            fullWidth
            label="Stock Disponible"
            type="number"
            value={editTool.availableStock}
            onChange={(e) => setEditTool({ ...editTool, availableStock: parseInt(e.target.value) || 0 })}
            sx={{ mb: 2 }}
            required
            inputProps={{ min: 0 }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseEditModal} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleEditTool} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Guardar Cambios'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar la herramienta "{selectedTool?.name}"?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteTool} variant="contained" color="error" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InventoryContent;
