import React from 'react';
import { Typography, Grid, Paper, Box, Alert, AlertTitle } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import '../styles/AlertsContent.css'; // Importa el CSS

function AlertsContent({ tools, loans }) {
  // Generar alertas dinámicas
  const alerts = [];

  // Alerta: Herramientas con stock bajo (menos de 3 unidades)
  tools.forEach(tool => {
    if (tool.availableStock < 3 && tool.availableStock > 0) {
      alerts.push({
        type: 'warning',
        title: 'Stock Bajo',
        message: `La herramienta "${tool.name}" tiene solo ${tool.availableStock} unidades disponibles.`,
        icon: <WarningIcon />,
      });
    }
  });

  // Alerta: Herramientas sin stock (disponible = 0)
  tools.forEach(tool => {
    if (tool.availableStock === 0) {
      alerts.push({
        type: 'error',
        title: 'Sin Stock',
        message: `La herramienta "${tool.name}" está agotada. Considera reabastecer.`,
        icon: <ErrorIcon />,
      });
    }
  });

  // Alerta: Préstamos vencidos (fecha de devolución pasada)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  loans.forEach(loan => {
    if (loan.status === 'Activo' && loan.returnDate < todayStr) {
      alerts.push({
        type: 'error',
        title: 'Préstamo Vencido',
        message: `El préstamo de "${loan.toolName}" para ${loan.user} venció el ${loan.returnDate}.`,
        icon: <ErrorIcon />,
      });
    }
  });

  // Alerta: Préstamos próximos a vencer (dentro de 3 días)
  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(today.getDate() + 3);
  const threeDaysStr = threeDaysFromNow.toISOString().split('T')[0];
  loans.forEach(loan => {
    if (loan.status === 'Activo' && loan.returnDate <= threeDaysStr && loan.returnDate >= todayStr) {
      alerts.push({
        type: 'warning',
        title: 'Préstamo Próximo a Vencer',
        message: `El préstamo de "${loan.toolName}" para ${loan.user} vence el ${loan.returnDate}.`,
        icon: <WarningIcon />,
      });
    }
  });

  // Alerta: Estadísticas generales (siempre visible)
  const totalTools = tools.length;
  const activeLoans = loans.filter(l => l.status === 'Activo').length;
  alerts.push({
    type: 'info',
    title: 'Resumen General',
    message: `Total de herramientas: ${totalTools}. Préstamos activos: ${activeLoans}.`,
    icon: <InfoIcon />,
  });

  // Alerta: Recordatorios de mantenimiento (simulado para herramientas eléctricas)
  tools.forEach(tool => {
    if (tool.category === 'Herramientas Eléctricas' && tool.availableStock > 0) {
      alerts.push({
        type: 'info',
        title: 'Mantenimiento Recomendado',
        message: `Considera revisar el mantenimiento de "${tool.name}" (eléctrica).`,
        icon: <BuildIcon />,
      });
    }
  });

  // Alerta: Sin alertas críticas (solo si no hay warning/error)
  const hasCriticalAlerts = alerts.some(alert => alert.type === 'error' || alert.type === 'warning');
  if (!hasCriticalAlerts) {
    alerts.push({
      type: 'success',
      title: 'Todo en Orden',
      message: 'No hay alertas críticas. ¡Todo está bajo control!',
      icon: <CheckCircleIcon />,
    });
  }

  return (
    <div className="alerts-container">
      <Typography variant="h4" gutterBottom>Notificaciones</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className="alerts-paper">
            <Typography variant="h6" className="alerts-title">Notificaciones Recientes</Typography>
            <Box className="alerts-list">
              {alerts.map((alert, index) => (
                <Alert
                  key={index}
                  severity={alert.type}
                  icon={alert.icon}
                  className="alert-item"
                >
                  <AlertTitle>{alert.title}</AlertTitle>
                  {alert.message}
                </Alert>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AlertsContent;
