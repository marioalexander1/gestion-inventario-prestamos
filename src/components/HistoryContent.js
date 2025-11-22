import React, { useState } from 'react';
import { 
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  InputAdornment, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/HistoryContent.css';

function HistoryContent({ loans, setLoans }) {
  const { hasRole } = useAuth();
  const notification = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [dateFilter, setDateFilter] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState(null);

  // Filtrar préstamos
  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.toolName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'Todos' || loan.status === statusFilter;

    const matchesDate =
      !dateFilter ||
      loan.loanDate.includes(dateFilter) ||
      loan.returnDate.includes(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calcular estadísticas
  const totalLoans = loans.length;
  const activeLoans = loans.filter((l) => l.status === 'Activo').length;
  const returnedLoans = loans.filter((l) => l.status === 'Devuelto').length;
  const overdueLoans = loans.filter((l) => {
    if (l.status !== 'Activo') return false;
    const today = new Date().toISOString().split('T')[0];
    return l.returnDate < today;
  }).length;

  const handleOpenDeleteDialog = (loan) => {
    setLoanToDelete(loan);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setLoanToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteLoan = () => {
    if (!loanToDelete) return;
    setLoans(loans.filter(loan => loan.id !== loanToDelete.id));
    notification.success('Registro de historial eliminado.');
    handleCloseDeleteDialog();
  };

  const columns = [
    { field: 'user', headerName: 'Usuario', width: 180 },
    { field: 'toolName', headerName: 'Herramienta', width: 180 },
    { field: 'loanDate', headerName: 'Fecha Préstamo', width: 140 },
    {
      field: 'timestamp',
      headerName: 'Hora',
      width: 100,
      renderCell: (params) => params.value ? new Date(params.value).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ''
    },
    { field: 'returnDate', headerName: 'Fecha Devolución', width: 150 },
    {
      field: 'status',
      headerName: 'Estado',
      width: 130,
      renderCell: (params) => {
        let color = 'default';
        if (params.value === 'Activo') {
          // Verificar si está vencido
          const today = new Date().toISOString().split('T')[0];
          if (params.row.returnDate < today) {
            color = 'error';
            return <Chip label="Vencido" color={color} size="small" />;
          }
          color = 'primary';
        } else if (params.value === 'Devuelto') {
          color = 'success';
        }
        return <Chip label={params.value} color={color} size="small" />;
      },
    },
    {
      field: 'duration',
      headerName: 'Duración',
      width: 120,
      renderCell: (params) => {
        const start = new Date(params.row.loanDate);
        const end = new Date(params.row.returnDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return `${days} días`;
      },
    },
  ];

  if (hasRole('admin')) {
    columns.push({
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleOpenDeleteDialog(params.row)}>
          <DeleteIcon />
        </IconButton>
      ),
    });
  }


  return (
    <div className="history-container">
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Historial de Préstamos
      </Typography>

      {/* Estadísticas */}
      <Box className="history-stats">
        <Paper className="stat-card">
          <Typography variant="h6" color="primary">
            {totalLoans}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Total Préstamos
          </Typography>
        </Paper>
        <Paper className="stat-card">
          <Typography variant="h6" color="info.main">
            {activeLoans}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Activos
          </Typography>
        </Paper>
        <Paper className="stat-card">
          <Typography variant="h6" color="success.main">
            {returnedLoans}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Devueltos
          </Typography>
        </Paper>
        <Paper className="stat-card">
          <Typography variant="h6" color="error.main">
            {overdueLoans}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Vencidos
          </Typography>
        </Paper>
      </Box>

      {/* Filtros */}
      <Paper className="history-filters">
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por usuario o herramienta..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1, minWidth: 250 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={statusFilter}
            label="Estado"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Devuelto">Devuelto</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Filtrar por fecha"
          type="date"
          size="small"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />
      </Paper>

      {/* Tabla de historial */}
      <Paper className="history-table">
        <DataGrid
          rows={filteredLoans}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </Paper>

      {filteredLoans.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" color="textSecondary">
            No se encontraron préstamos con los filtros aplicados
          </Typography>
        </Box>
      )}

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este registro del historial? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDeleteLoan} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HistoryContent;
