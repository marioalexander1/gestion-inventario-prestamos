import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import '../styles/ReportsContent.css'; // Importa el CSS

function ReportsContent({ tools, loans }) {
  // Calcular datos para gráficos
  const categoryData = tools.reduce((acc, tool) => {
    const category = tool.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.keys(categoryData).map(category => ({
    category,
    count: categoryData[category],
  }));

  const stockData = [
    { name: 'Disponible', value: tools.filter(t => t.status === 'Disponible').length },
    { name: 'Bajo Stock', value: tools.filter(t => t.status === 'Bajo Stock').length },
  ];
  const colors = ['#4caf50', '#ff9800']; // Verde para disponible, naranja para bajo stock

  const activeLoans = loans.filter(l => l.status === 'Activo').length;
  const totalTools = tools.length;

  return (
    <div className="reports-container">
      <Typography variant="h4" gutterBottom>Reportes</Typography>

      {/* Estadísticas Numéricas */}
      <Grid container spacing={2} className="reports-stats">
        <Grid item xs={12} md={4}>
          <Paper className="reports-paper">
            <Typography variant="h6">Total de Herramientas</Typography>
            <Typography variant="h4">{totalTools}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="reports-paper">
            <Typography variant="h6">Préstamos Activos</Typography>
            <Typography variant="h4">{activeLoans}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="reports-paper">
            <Typography variant="h6">Herramientas Disponibles</Typography>
            <Typography variant="h4">{tools.filter(t => t.status === 'Disponible').length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={2} className="reports-charts">
        <Grid item xs={12} md={6}>
          <Paper className="reports-paper">
            <Typography variant="h6">Herramientas por Categoría</Typography>
            <Box className="reports-chart">
              <BarChart width={400} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="reports-paper">
            <Typography variant="h6">Estado de Stock</Typography>
            <Box className="reports-chart">
              <PieChart width={400} height={300}>
                <Pie
                  data={stockData}
                  cx={200}
                  cy={150}
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReportsContent;