import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Divider,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNotification } from '../context/NotificationContext';
import {
  exportToolsToExcel,
  exportLoansToExcel,
  exportToolsToPDF,
  exportLoansToPDF,
  exportFullReportToPDF,
} from '../utils/exportUtils';
import '../styles/GenerateReportsContent.css';

function GenerateReportsContent({ tools, loans }) {
  const notification = useNotification();
  const [reportType, setReportType] = useState('inventory');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleGenerateReport = () => {
    try {
      let success = false;

      if (reportType === 'inventory') {
        if (exportFormat === 'excel') {
          success = exportToolsToExcel(tools);
        } else {
          success = exportToolsToPDF(tools);
        }
      } else if (reportType === 'loans') {
        // Filtrar préstamos por fecha si se especifica
        let filteredLoans = loans;
        if (dateFrom || dateTo) {
          filteredLoans = loans.filter((loan) => {
            const loanDate = new Date(loan.loanDate);
            const from = dateFrom ? new Date(dateFrom) : new Date('1900-01-01');
            const to = dateTo ? new Date(dateTo) : new Date('2100-12-31');
            return loanDate >= from && loanDate <= to;
          });
        }

        if (exportFormat === 'excel') {
          success = exportLoansToExcel(filteredLoans);
        } else {
          success = exportLoansToPDF(filteredLoans);
        }
      } else if (reportType === 'complete') {
        success = exportFullReportToPDF(tools, loans);
      }

      if (success) {
        notification.success('Reporte generado exitosamente');
      } else {
        notification.error('Error al generar el reporte');
      }
    } catch (error) {
      console.error('Error:', error);
      notification.error('Error al generar el reporte');
    }
  };

  return (
    <div className="generate-reports-container">
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Generar Reportes
      </Typography>

      <Grid container spacing={3}>
        {/* Formulario de configuración */}
        <Grid item xs={12} md={6}>
          <Paper className="generate-reports-paper">
            <Typography variant="h6" className="generate-reports-title" gutterBottom>
              Configuración del Reporte
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tipo de Reporte</InputLabel>
              <Select
                value={reportType}
                label="Tipo de Reporte"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="inventory">Inventario de Herramientas</MenuItem>
                <MenuItem value="loans">Préstamos</MenuItem>
                <MenuItem value="complete">Reporte Completo</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Formato de Exportación</InputLabel>
              <Select
                value={exportFormat}
                label="Formato de Exportación"
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="excel">Excel</MenuItem>
              </Select>
            </FormControl>

            {reportType === 'loans' && (
              <>
                <TextField
                  fullWidth
                  label="Fecha Desde"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Fecha Hasta"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3 }}
                />
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleGenerateReport}
              startIcon={exportFormat === 'pdf' ? <PictureAsPdfIcon /> : <TableChartIcon />}
              sx={{
                bgcolor: '#6C5CE7',
                '&:hover': { bgcolor: '#5B4BC7' },
              }}
            >
              Generar Reporte
            </Button>
          </Paper>
        </Grid>

        {/* Información y vista previa */}
        <Grid item xs={12} md={6}>
          <Paper className="generate-reports-paper">
            <Typography variant="h6" className="generate-reports-title" gutterBottom>
              Información del Reporte
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Tipo de Reporte:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {reportType === 'inventory' && 'Inventario de Herramientas'}
                {reportType === 'loans' && 'Préstamos'}
                {reportType === 'complete' && 'Reporte Completo del Sistema'}
              </Typography>

              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Formato:
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {exportFormat === 'pdf' ? 'PDF' : 'Excel (XLSX)'}
              </Typography>

              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Contenido:
              </Typography>
              {reportType === 'inventory' && (
                <Typography variant="body2">
                  • Total de herramientas: {tools.length}
                  <br />
                  • Herramientas disponibles: {tools.filter((t) => t.status === 'Disponible').length}
                  <br />
                  • Herramientas con bajo stock: {tools.filter((t) => t.status === 'Bajo Stock').length}
                  <br />• Incluye: ID, Nombre, Categoría, Marca, Stock
                </Typography>
              )}
              {reportType === 'loans' && (
                <Typography variant="body2">
                  • Total de préstamos: {loans.length}
                  <br />
                  • Préstamos activos: {loans.filter((l) => l.status === 'Activo').length}
                  <br />
                  • Préstamos devueltos: {loans.filter((l) => l.status === 'Devuelto').length}
                  <br />• Incluye: Usuario, Herramienta, Fechas, Estado
                </Typography>
              )}
              {reportType === 'complete' && (
                <Typography variant="body2">
                  • Resumen general del sistema
                  <br />
                  • Inventario completo de herramientas
                  <br />
                  • Todos los préstamos activos
                  <br />• Estadísticas y métricas clave
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Nota:
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  El reporte se descargará automáticamente en tu dispositivo con la fecha actual en el nombre del archivo.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Accesos rápidos */}
        <Grid item xs={12}>
          <Paper className="generate-reports-paper">
            <Typography variant="h6" gutterBottom>
              Accesos Rápidos
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={() => {
                    exportToolsToPDF(tools);
                    notification.success('Inventario exportado a PDF');
                  }}
                >
                  Inventario PDF
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<TableChartIcon />}
                  onClick={() => {
                    exportToolsToExcel(tools);
                    notification.success('Inventario exportado a Excel');
                  }}
                >
                  Inventario Excel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={() => {
                    exportLoansToPDF(loans);
                    notification.success('Préstamos exportados a PDF');
                  }}
                >
                  Préstamos PDF
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<TableChartIcon />}
                  onClick={() => {
                    exportLoansToExcel(loans);
                    notification.success('Préstamos exportados a Excel');
                  }}
                >
                  Préstamos Excel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default GenerateReportsContent;
