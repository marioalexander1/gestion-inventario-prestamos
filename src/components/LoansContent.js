import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useNotification } from '../context/NotificationContext';
import '../styles/LoansContent.css';

function LoansContent({ tools, setTools, loans, setLoans }) {
  const notification = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [newLoan, setNewLoan] = useState({ user: '', toolId: '', loanDate: '', returnDate: '' });
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    // Establecer fecha actual como fecha de préstamo por defecto
    const today = new Date().toISOString().split('T')[0];
    setNewLoan({ ...newLoan, loanDate: today });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewLoan({ user: '', toolId: '', loanDate: '', returnDate: '' });
  };

  const handleOpenReturnDialog = (loan) => {
    setSelectedLoan(loan);
    setOpenReturnDialog(true);
  };

  const handleCloseReturnDialog = () => {
    setOpenReturnDialog(false);
    setSelectedLoan(null);
  };

  const handleAddLoan = () => {
    // Validaciones
    if (!newLoan.user.trim()) {
      notification.error('El nombre del usuario es obligatorio');
      return;
    }
    if (!newLoan.toolId) {
      notification.error('Debes seleccionar una herramienta');
      return;
    }
    if (!newLoan.loanDate) {
      notification.error('La fecha de préstamo es obligatoria');
      return;
    }
    if (!newLoan.returnDate) {
      notification.error('La fecha de devolución es obligatoria');
      return;
    }

    // Validar que la fecha de devolución sea posterior a la de préstamo
    if (new Date(newLoan.returnDate) <= new Date(newLoan.loanDate)) {
      notification.error('La fecha de devolución debe ser posterior a la fecha de préstamo');
      return;
    }

    const selectedTool = tools.find((t) => t.id === parseInt(newLoan.toolId));
    
    if (!selectedTool) {
      notification.error('Herramienta no encontrada');
      return;
    }

    if (selectedTool.availableStock <= 0) {
      notification.error('La herramienta no tiene stock disponible');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newId = loans.length > 0 ? Math.max(...loans.map((l) => l.id)) + 1 : 1;
      const newLoanEntry = {
        id: newId,
        user: newLoan.user.trim(),
        toolId: selectedTool.id,
        toolName: selectedTool.name,
        loanDate: newLoan.loanDate,
        returnDate: newLoan.returnDate,
        status: 'Activo',
      };
      setLoans([...loans, newLoanEntry]);
      
      // Reducir stock disponible
      setTools(
        tools.map((t) =>
          t.id === selectedTool.id
            ? {
                ...t,
                availableStock: t.availableStock - 1,
                status: t.availableStock - 1 > 2 ? 'Disponible' : 'Bajo Stock',
              }
            : t
        )
      );
      
      notification.success(`Préstamo registrado para ${newLoan.user}`);
      handleCloseModal();
      setLoading(false);
    }, 500);
  };

  const handleReturn = () => {
    if (!selectedLoan) return;

    setLoading(true);

    setTimeout(() => {
      const loan = loans.find((l) => l.id === selectedLoan.id);
      if (loan) {
        setLoans(loans.map((l) => (l.id === selectedLoan.id ? { ...l, status: 'Devuelto' } : l)));
        setTools(
          tools.map((t) =>
            t.id === loan.toolId
              ? {
                  ...t,
                  availableStock: t.availableStock + 1,
                  status: t.availableStock + 1 > 2 ? 'Disponible' : 'Bajo Stock',
                }
              : t
          )
        );
        notification.success(`Herramienta "${loan.toolName}" devuelta correctamente`);
      }
      handleCloseReturnDialog();
      setLoading(false);
    }, 500);
  };

  // Verificar si un préstamo está vencido
  const isOverdue = (returnDate) => {
    const today = new Date().toISOString().split('T')[0];
    return returnDate < today;
  };

  const activeLoans = loans.filter((l) => l.status === 'Activo');

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Préstamos Activos
      </Typography>

      {activeLoans.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No hay préstamos activos
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Registra un nuevo préstamo para comenzar
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {activeLoans.map((loan) => (
            <Grid item xs={12} md={6} lg={4} key={loan.id}>
              <Card className="loan-card" sx={{ position: 'relative' }}>
                {isOverdue(loan.returnDate) && (
                  <Chip
                    label="VENCIDO"
                    color="error"
                    size="small"
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {loan.toolName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Usuario: <strong>{loan.user}</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Fecha Préstamo: {loan.loanDate}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={isOverdue(loan.returnDate) ? 'error' : 'textSecondary'}
                  >
                    Fecha Devolución: {loan.returnDate}
                  </Typography>
                  <Chip
                    label={loan.status}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={() => handleOpenReturnDialog(loan)}
                  >
                    Marcar como Devuelto
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Registrar Nuevo Préstamo
        </Button>
      </Box>

      {/* Modal Registrar Préstamo */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="loans-modal">
          <Typography variant="h6" gutterBottom>
            Registrar Nuevo Préstamo
          </Typography>
          <TextField
            fullWidth
            label="Usuario"
            value={newLoan.user}
            onChange={(e) => setNewLoan({ ...newLoan, user: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <FormControl fullWidth sx={{ mb: 2 }} required>
            <InputLabel>Herramienta</InputLabel>
            <Select
              value={newLoan.toolId}
              label="Herramienta"
              onChange={(e) => setNewLoan({ ...newLoan, toolId: e.target.value })}
            >
              {tools.filter((tool) => tool.availableStock > 0).length === 0 ? (
                <MenuItem disabled>No hay herramientas disponibles</MenuItem>
              ) : (
                tools
                  .filter((tool) => tool.availableStock > 0)
                  .map((tool) => (
                    <MenuItem key={tool.id} value={tool.id}>
                      {tool.name} (Disponible: {tool.availableStock})
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Fecha de Préstamo"
            type="date"
            value={newLoan.loanDate}
            onChange={(e) => setNewLoan({ ...newLoan, loanDate: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Fecha de Devolución"
            type="date"
            value={newLoan.returnDate}
            onChange={(e) => setNewLoan({ ...newLoan, returnDate: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
            required
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseModal} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleAddLoan} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Registrar'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Diálogo de confirmación de devolución */}
      <Dialog open={openReturnDialog} onClose={handleCloseReturnDialog}>
        <DialogTitle>Confirmar Devolución</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Confirmas que la herramienta "<strong>{selectedLoan?.toolName}</strong>" ha sido devuelta por{' '}
            <strong>{selectedLoan?.user}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReturnDialog} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleReturn} variant="contained" color="success" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Confirmar Devolución'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoansContent;
