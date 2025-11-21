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
  CardContent
} from '@mui/material';
import '../styles/LoansContent.css'; // Importa aquí tu CSS externo

function LoansContent({ tools, setTools, loans, setLoans }) {
  const [openModal, setOpenModal] = useState(false);
  const [newLoan, setNewLoan] = useState({ user: '', toolId: '', loanDate: '', returnDate: '' });

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewLoan({ user: '', toolId: '', loanDate: '', returnDate: '' });
  };

  const handleAddLoan = () => {
    if (newLoan.user && newLoan.toolId && newLoan.loanDate && newLoan.returnDate) {
      const selectedTool = tools.find(t => t.id === parseInt(newLoan.toolId));
      if (selectedTool && selectedTool.availableStock > 0) {
        const newId = loans.length + 1;
        const newLoanEntry = {
          id: newId,
          user: newLoan.user,
          toolId: selectedTool.id,
          toolName: selectedTool.name,
          loanDate: newLoan.loanDate,
          returnDate: newLoan.returnDate,
          status: 'Activo',
        };
        setLoans([...loans, newLoanEntry]);
        // Reducir stock disponible
        setTools(tools.map(t =>
          t.id === selectedTool.id
            ? {
                ...t,
                availableStock: t.availableStock - 1,
                status: t.availableStock - 1 > 2 ? 'Disponible' : 'Bajo Stock',
              }
            : t
        ));
        handleCloseModal();
      } else {
        alert('Herramienta no disponible o sin stock.');
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleReturn = (loanId) => {
    const loan = loans.find(l => l.id === loanId);
    if (loan) {
      setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'Devuelto' } : l));
      setTools(tools.map(t =>
        t.id === loan.toolId
          ? {
              ...t,
              availableStock: t.availableStock + 1,
              status: t.availableStock + 1 > 2 ? 'Disponible' : 'Bajo Stock',
            }
          : t
      ));
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Préstamos Activos
      </Typography>

      <Grid container spacing={2}>
        {loans.filter(l => l.status === 'Activo').map(loan => (
          <Grid item xs={12} md={6} lg={4} key={loan.id}>
            <Card className="loan-card">
              <CardContent>
                <Typography variant="h6">{loan.toolName}</Typography>
                <Typography>Usuario: {loan.user}</Typography>
                <Typography>Fecha Préstamo: {loan.loanDate}</Typography>
                <Typography>Fecha Devolución: {loan.returnDate}</Typography>
                <Typography className="loan-status">Estado: {loan.status}</Typography>
                <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={() => handleReturn(loan.id)}>
                  Marcar como Devuelto
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Registrar Nuevo Préstamo
        </Button>
      </Box>

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
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Herramienta</InputLabel>
            <Select
              value={newLoan.toolId}
              onChange={(e) => setNewLoan({ ...newLoan, toolId: e.target.value })}
            >
              {tools.filter(tool => tool.availableStock > 0).map(tool => (
                <MenuItem key={tool.id} value={tool.id}>
                  {tool.name} (Disponible: {tool.availableStock})
                </MenuItem>
              ))}
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
          />
          <TextField
            fullWidth
            label="Fecha de Devolución"
            type="date"
            value={newLoan.returnDate}
            onChange={(e) => setNewLoan({ ...newLoan, returnDate: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="contained" onClick={handleAddLoan}>
              Registrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default LoansContent;
