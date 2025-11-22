import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

function CreateReportContent() {
  const notification = useNotification();
  const { user } = useAuth();
  const [reportTitle, setReportTitle] = useState('');
  const [reportBody, setReportBody] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);

  const handleFileChange = (event) => {
    if (event.target.files.length > 5) {
      notification.error('No puedes subir más de 5 archivos.');
      return;
    }
    setAttachedFiles(Array.from(event.target.files));
  };

  const handleSendEmail = () => {
    if (!reportTitle.trim() || !reportBody.trim()) {
      notification.error('El título y el cuerpo del reporte son obligatorios.');
      return;
    }

    const directorEmail = 'direccion@example.com'; // Correo de destino (configurable)
    const subject = `Reporte de Incidencia: ${reportTitle}`;
    
    let body = `Reporte generado por: ${user.name}\n`;
    body += `Fecha: ${new Date().toLocaleString('es-ES')}\n\n`;
    body += `--------------------------------------------------\n\n`;
    body += `${reportBody}\n\n`;

    if (attachedFiles.length > 0) {
      body += `--------------------------------------------------\n`;
      body += `NOTA: Por favor, no olvide adjuntar manualmente los ${attachedFiles.length} archivo(s) seleccionados a este correo.`;
    }

    const mailtoLink = `mailto:${directorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    notification.success('Tu aplicación de correo se está abriendo para enviar el reporte.');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 900, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Generar Reporte de Incidencias
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Utiliza este formulario para reportar análisis, inconvenientes o necesidades de herramientas. El reporte se abrirá en tu cliente de correo para ser enviado a dirección.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <TextField
        fullWidth
        label="Título del Reporte"
        value={reportTitle}
        onChange={(e) => setReportTitle(e.target.value)}
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        label="Cuerpo del Reporte"
        value={reportBody}
        onChange={(e) => setReportBody(e.target.value)}
        variant="outlined"
        multiline
        rows={10}
        placeholder="Describe detalladamente la incidencia, análisis o necesidad..."
        sx={{ mb: 3 }}
      />

      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<AttachFileIcon />}
        >
          Adjuntar Fotos (Opcional)
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {attachedFiles.map((file, index) => (
            <Chip key={index} label={file.name} onDelete={() => {
              setAttachedFiles(files => files.filter((_, i) => i !== index));
            }} />
          ))}
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        startIcon={<SendIcon />}
        onClick={handleSendEmail}
        sx={{
          bgcolor: '#6C5CE7',
          '&:hover': { bgcolor: '#5B4BC7' },
        }}
      >
        Preparar Correo para Enviar a Dirección
      </Button>
    </Paper>
  );
}

export default CreateReportContent;