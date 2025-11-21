import React from 'react';
import { Typography, Paper } from '@mui/material';

function Reports() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Reportes</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Resumen de Actividad</Typography>
        <Typography>- Herramientas prestadas esta semana: 8</Typography>
        <Typography>- Devoluciones pendientes: 3</Typography>
        {/* Aquí puedes agregar gráficos o tablas más tarde */}
      </Paper>
    </div>
  );
}

export default Reports;