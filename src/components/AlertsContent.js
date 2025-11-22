import React from 'react';
import { Typography, Paper, Box, Alert, AlertTitle } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { useAuth } from '../context/AuthContext';
import '../styles/AlertsContent.css'; // Importa el CSS

function AlertsContent({ loans, setLoans }) {
  const { hasRole } = useAuth();

  // Ordenar los préstamos por fecha para que actúen como un log cronológico
  const sortedActivities = [...loans].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActivityMessage = (loan) => {
    const action = loan.status === 'Activo' ? 'prestó' : 'devolvió';
    const tool = <strong>{loan.toolName}</strong>;
    const borrower = <strong>{loan.user}</strong>;
    const systemUser = <strong>{loan.loanedBy || 'Sistema'}</strong>;
    
    if (loan.status === 'Activo') {
      return <>{systemUser} {action} la herramienta {tool} a {borrower}.</>;
    } else {
      return <>La herramienta {tool} prestada a {borrower} fue devuelta.</>;
    }
  };

  return (
    <div className="alerts-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Historial de Actividad
        </Typography>
      </Box>
      <Paper className="alerts-paper">
        <Box className="alerts-list">
          {sortedActivities.map((loan) => (
            <Alert
              key={loan.id + loan.status}
              severity={loan.status === 'Activo' ? 'info' : 'success'}
              icon={loan.status === 'Activo' ? <AssignmentLateIcon /> : <AssignmentTurnedInIcon />}
              className="alert-item"
            >
              <AlertTitle>{formatTimestamp(loan.timestamp)}</AlertTitle>
              {getActivityMessage(loan)}
            </Alert>
          ))}
        </Box>
      </Paper>
    </div>
  );
}

export default AlertsContent;
