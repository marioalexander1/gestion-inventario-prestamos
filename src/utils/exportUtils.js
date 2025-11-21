import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Exportar datos a Excel
export const exportToExcel = (data, filename = 'reporte') => {
  try {
    // Crear un nuevo libro de trabajo
    const wb = XLSX.utils.book_new();
    
    // Convertir datos a hoja de trabajo
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    
    // Generar archivo Excel
    XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
    return false;
  }
};

// Exportar herramientas a Excel
export const exportToolsToExcel = (tools) => {
  const data = tools.map(tool => ({
    'ID': tool.id,
    'Nombre': tool.name,
    'Categoría': tool.category,
    'Marca': tool.brand,
    'Stock Disponible': tool.availableStock,
    'Stock Total': tool.totalStock,
    'Estado': tool.status,
  }));
  
  return exportToExcel(data, 'inventario_herramientas');
};

// Exportar préstamos a Excel
export const exportLoansToExcel = (loans) => {
  const data = loans.map(loan => ({
    'ID': loan.id,
    'Usuario': loan.user,
    'Herramienta': loan.toolName,
    'Fecha Préstamo': loan.loanDate,
    'Fecha Devolución': loan.returnDate,
    'Estado': loan.status,
  }));
  
  return exportToExcel(data, 'prestamos');
};

// Exportar datos a PDF
export const exportToPDF = (title, headers, data, filename = 'reporte') => {
  try {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    // Fecha
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Tabla
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 35,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [108, 92, 231] }, // Color morado del tema
    });
    
    // Guardar PDF
    doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    return false;
  }
};

// Exportar herramientas a PDF
export const exportToolsToPDF = (tools) => {
  const headers = ['ID', 'Nombre', 'Categoría', 'Marca', 'Stock Disp.', 'Stock Total', 'Estado'];
  const data = tools.map(tool => [
    tool.id,
    tool.name,
    tool.category,
    tool.brand,
    tool.availableStock,
    tool.totalStock,
    tool.status,
  ]);
  
  return exportToPDF('Inventario de Herramientas', headers, data, 'inventario_herramientas');
};

// Exportar préstamos a PDF
export const exportLoansToPDF = (loans) => {
  const headers = ['ID', 'Usuario', 'Herramienta', 'Fecha Préstamo', 'Fecha Devolución', 'Estado'];
  const data = loans.map(loan => [
    loan.id,
    loan.user,
    loan.toolName,
    loan.loanDate,
    loan.returnDate,
    loan.status,
  ]);
  
  return exportToPDF('Reporte de Préstamos', headers, data, 'prestamos');
};

// Exportar reporte completo a PDF
export const exportFullReportToPDF = (tools, loans) => {
  try {
    const doc = new jsPDF();
    
    // Título principal
    doc.setFontSize(20);
    doc.text('Reporte Completo del Sistema', 14, 22);
    
    // Fecha
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Estadísticas generales
    doc.setFontSize(14);
    doc.text('Resumen General', 14, 40);
    doc.setFontSize(10);
    doc.text(`Total de Herramientas: ${tools.length}`, 14, 48);
    doc.text(`Préstamos Activos: ${loans.filter(l => l.status === 'Activo').length}`, 14, 54);
    doc.text(`Herramientas Disponibles: ${tools.filter(t => t.status === 'Disponible').length}`, 14, 60);
    doc.text(`Herramientas con Bajo Stock: ${tools.filter(t => t.status === 'Bajo Stock').length}`, 14, 66);
    
    // Tabla de herramientas
    doc.setFontSize(14);
    doc.text('Inventario de Herramientas', 14, 76);
    doc.autoTable({
      head: [['ID', 'Nombre', 'Categoría', 'Marca', 'Stock Disp.', 'Stock Total', 'Estado']],
      body: tools.map(tool => [
        tool.id,
        tool.name,
        tool.category,
        tool.brand,
        tool.availableStock,
        tool.totalStock,
        tool.status,
      ]),
      startY: 80,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [108, 92, 231] },
    });
    
    // Nueva página para préstamos
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Préstamos Activos', 14, 22);
    doc.autoTable({
      head: [['ID', 'Usuario', 'Herramienta', 'Fecha Préstamo', 'Fecha Devolución', 'Estado']],
      body: loans.filter(l => l.status === 'Activo').map(loan => [
        loan.id,
        loan.user,
        loan.toolName,
        loan.loanDate,
        loan.returnDate,
        loan.status,
      ]),
      startY: 26,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [108, 92, 231] },
    });
    
    // Guardar PDF
    doc.save(`reporte_completo_${new Date().toISOString().split('T')[0]}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error al exportar reporte completo a PDF:', error);
    return false;
  }
};

const exportUtils = {
  exportToExcel,
  exportToolsToExcel,
  exportLoansToExcel,
  exportToPDF,
  exportToolsToPDF,
  exportLoansToPDF,
  exportFullReportToPDF,
};

export default exportUtils;
