import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import '../styles/GenerateReportsContent.css'; // Import corregido

function GenerateReportsContent() {
  return (
    <div className="generate-reports-container">
      <Typography variant="h4" gutterBottom>Generar Reportes</Typography>
      <Grid className="generate-reports-grid" container spacing={2}>
        <Grid item xs={12}>
          <Paper className="generate-reports-paper">
            <Typography variant="h6" className="generate-reports-title">Seleccionar Tipo de Reporte</Typography>
            <div className="generate-reports-form">
              <Typography>Formulario con dropdowns (tipo: Inventario, Préstamos), rango de fechas y botón para generar PDF/Excel.</Typography>
              <button className="generate-reports-button">Generar Reporte</button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default GenerateReportsContent;