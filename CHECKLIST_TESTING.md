# ✅ Checklist de Testing - Sistema de Gestión de Inventario y Préstamos

## 🔐 1. AUTENTICACIÓN

### Login
- [ ] Abrir http://localhost:3000
- [ ] Verificar que aparece la pantalla de login
- [ ] Intentar login con credenciales incorrectas → Debe mostrar error
- [ ] Login con `admin` / `admin123` → Debe entrar al dashboard
- [ ] Verificar que el avatar muestra la inicial "A"
- [ ] Verificar que aparece "Administrador" en el header

### Persistencia de Sesión
- [ ] Recargar la página (F5) → Debe mantener la sesión
- [ ] Cerrar y abrir el navegador → Debe mantener la sesión

### Logout
- [ ] Click en "Cerrar sesión" en el menú
- [ ] Debe aparecer diálogo de confirmación
- [ ] Click en "Cancelar" → No debe cerrar sesión
- [ ] Click en "Cerrar sesión" nuevamente
- [ ] Click en "Cerrar Sesión" en el diálogo → Debe volver al login
- [ ] Verificar notificación toast verde "Sesión cerrada correctamente"

---

## 📦 2. GESTIÓN DE INVENTARIO

### Ver Inventario
- [ ] Login nuevamente
- [ ] Click en "Inventario existente" en el menú
- [ ] Verificar que aparecen 3 herramientas por defecto
- [ ] Verificar que la tabla muestra: Nombre, Categoría, Marca, Stock Disp., Stock Total, Estado, Acciones
- [ ] Verificar notificación toast "Datos cargados correctamente"

### Agregar Herramienta
- [ ] Click en "Agregar Nueva Herramienta"
- [ ] Intentar agregar sin llenar campos → Debe mostrar errores toast rojos
- [ ] Llenar todos los campos:
  - Nombre: "Sierra Eléctrica"
  - Categoría: "Herramientas Eléctricas"
  - Marca: "DeWalt"
  - Stock Total: 3
- [ ] Click en "Agregar"
- [ ] Verificar loading spinner en el botón
- [ ] Verificar notificación toast verde "Herramienta 'Sierra Eléctrica' agregada exitosamente"
- [ ] Verificar que aparece en la tabla
- [ ] Verificar que Stock Disponible = Stock Total = 3

### Editar Herramienta
- [ ] Click en el ícono de lápiz (✏️) de "Sierra Eléctrica"
- [ ] Cambiar Stock Total a 5
- [ ] Cambiar Stock Disponible a 4
- [ ] Click en "Guardar Cambios"
- [ ] Verificar notificación toast verde
- [ ] Verificar que los cambios se reflejan en la tabla

### Eliminar Herramienta
- [ ] Click en el ícono de papelera (🗑️) de "Sierra Eléctrica"
- [ ] Debe aparecer diálogo de confirmación
- [ ] Click en "Cancelar" → No debe eliminar
- [ ] Click nuevamente en papelera
- [ ] Click en "Eliminar" → Debe eliminar
- [ ] Verificar notificación toast verde
- [ ] Verificar que ya no aparece en la tabla

### Exportar a Excel
- [ ] Click en "Exportar a Excel"
- [ ] Verificar notificación toast verde
- [ ] Verificar que se descarga un archivo .xlsx
- [ ] Abrir el archivo → Debe contener todas las herramientas

---

## 🔄 3. GESTIÓN DE PRÉSTAMOS

### Ver Préstamos Activos
- [ ] Click en "Préstamos activos" en el menú
- [ ] Verificar que aparecen 2 préstamos por defecto
- [ ] Verificar que cada tarjeta muestra: Herramienta, Usuario, Fechas, Estado, Botón

### Registrar Nuevo Préstamo
- [ ] Click en "Registrar Nuevo Préstamo"
- [ ] Intentar registrar sin llenar campos → Debe mostrar errores toast
- [ ] Llenar campos:
  - Usuario: "Carlos López"
  - Herramienta: Seleccionar "Destornillador"
  - Fecha Préstamo: (debe estar la fecha actual)
  - Fecha Devolución: Seleccionar una fecha futura
- [ ] Click en "Registrar"
- [ ] Verificar loading spinner
- [ ] Verificar notificación toast verde "Préstamo registrado para Carlos López"
- [ ] Verificar que aparece nueva tarjeta
- [ ] Ir a "Inventario existente"
- [ ] Verificar que el stock disponible de "Destornillador" disminuyó en 1

### Validación de Fechas
- [ ] Intentar registrar préstamo con fecha devolución anterior a préstamo
- [ ] Debe mostrar error toast "La fecha de devolución debe ser posterior..."

### Marcar como Devuelto
- [ ] Volver a "Préstamos activos"
- [ ] Click en "Marcar como Devuelto" en el préstamo de Carlos López
- [ ] Debe aparecer diálogo de confirmación
- [ ] Click en "Cancelar" → No debe devolver
- [ ] Click nuevamente en "Marcar como Devuelto"
- [ ] Click en "Confirmar Devolución"
- [ ] Verificar notificación toast verde
- [ ] Verificar que la tarjeta desaparece de préstamos activos
- [ ] Ir a "Inventario existente"
- [ ] Verificar que el stock disponible de "Destornillador" aumentó en 1

### Préstamos Vencidos
- [ ] Verificar si hay préstamos con fecha de devolución pasada
- [ ] Deben mostrar chip rojo "VENCIDO"
- [ ] La fecha de devolución debe estar en rojo

---

## 📚 4. HISTORIAL DE PRÉSTAMOS

### Ver Historial
- [ ] Click en "Historial de préstamos" en el menú
- [ ] Verificar que aparecen todos los préstamos (activos y devueltos)
- [ ] Verificar estadísticas en la parte superior:
  - Total Préstamos
  - Activos
  - Devueltos
  - Vencidos

### Filtros
- [ ] Filtrar por Estado "Activo" → Solo debe mostrar activos
- [ ] Filtrar por Estado "Devuelto" → Solo debe mostrar devueltos
- [ ] Filtrar por Estado "Todos" → Debe mostrar todos

### Búsqueda
- [ ] Escribir nombre de usuario en búsqueda
- [ ] Verificar que filtra en tiempo real
- [ ] Escribir nombre de herramienta
- [ ] Verificar que filtra correctamente

### Filtro por Fecha
- [ ] Seleccionar una fecha específica
- [ ] Verificar que filtra préstamos de esa fecha

---

## 📊 5. REPORTES VISUALES

### Ver Reportes
- [ ] Click en "Reportes" en el menú
- [ ] Verificar estadísticas numéricas:
  - Total de Herramientas
  - Préstamos Activos
  - Herramientas Disponibles
- [ ] Verificar gráfico de barras "Herramientas por Categoría"
- [ ] Verificar gráfico circular "Estado de Stock"

---

## 📄 6. GENERAR REPORTES

### Configurar Reporte
- [ ] Click en "Generar reportes" en el menú
- [ ] Seleccionar "Inventario de Herramientas"
- [ ] Seleccionar formato "PDF"
- [ ] Click en "Generar Reporte"
- [ ] Verificar notificación toast verde
- [ ] Verificar que se descarga PDF
- [ ] Abrir PDF → Debe contener tabla de herramientas

### Reporte de Préstamos
- [ ] Seleccionar "Préstamos"
- [ ] Seleccionar formato "Excel"
- [ ] Opcionalmente agregar filtros de fecha
- [ ] Click en "Generar Reporte"
- [ ] Verificar descarga de Excel
- [ ] Abrir Excel → Debe contener préstamos

### Reporte Completo
- [ ] Seleccionar "Reporte Completo"
- [ ] Formato "PDF"
- [ ] Click en "Generar Reporte"
- [ ] Verificar descarga
- [ ] Abrir PDF → Debe contener:
  - Resumen general
  - Tabla de herramientas
  - Tabla de préstamos activos

### Accesos Rápidos
- [ ] Click en "Inventario PDF" → Debe descargar
- [ ] Click en "Inventario Excel" → Debe descargar
- [ ] Click en "Préstamos PDF" → Debe descargar
- [ ] Click en "Préstamos Excel" → Debe descargar

---

## 🔔 7. NOTIFICACIONES

### Ver Notificaciones
- [ ] Click en "Notificaciones" en el menú
- [ ] Verificar que aparecen alertas sobre:
  - Herramientas con stock bajo
  - Herramientas sin stock (si hay)
  - Préstamos vencidos (si hay)
  - Préstamos próximos a vencer
  - Resumen general
  - Recordatorios de mantenimiento

### Tipos de Alertas
- [ ] Verificar alertas de tipo "warning" (naranja)
- [ ] Verificar alertas de tipo "error" (rojo)
- [ ] Verificar alertas de tipo "info" (azul)
- [ ] Verificar alertas de tipo "success" (verde)

---

## 💾 8. PERSISTENCIA DE DATOS

### Guardar Datos
- [ ] Agregar una nueva herramienta
- [ ] Registrar un nuevo préstamo
- [ ] Recargar la página (F5)
- [ ] Verificar que los datos siguen ahí

### Cerrar y Abrir Navegador
- [ ] Cerrar completamente el navegador
- [ ] Abrir nuevamente http://localhost:3000
- [ ] Login
- [ ] Verificar que todos los datos persisten

### LocalStorage
- [ ] Abrir DevTools (F12)
- [ ] Ir a Application → Local Storage
- [ ] Verificar claves:
  - `inventory_tools`
  - `inventory_loans`
  - `inventory_user`

---

## 🎨 9. INTERFAZ Y UX

### Notificaciones Toast
- [ ] Verificar que aparecen en la esquina superior derecha
- [ ] Verificar que desaparecen automáticamente
- [ ] Verificar colores:
  - Verde para éxito
  - Rojo para error
  - Azul para info

### Loading States
- [ ] Verificar spinners en botones durante operaciones
- [ ] Verificar que los botones se deshabilitan durante carga

### Tooltips
- [ ] Pasar el mouse sobre iconos de editar/eliminar
- [ ] Verificar que aparecen tooltips

### Responsive
- [ ] Reducir tamaño de ventana
- [ ] Verificar que la interfaz se adapta
- [ ] Probar en diferentes tamaños

---

## 🔄 10. FLUJO COMPLETO

### Flujo de Usuario Completo
- [ ] 1. Login con credenciales válidas
- [ ] 2. Ver inventario inicial
- [ ] 3. Agregar nueva herramienta "Llave Inglesa"
- [ ] 4. Registrar préstamo de "Llave Inglesa" para "Ana Martínez"
- [ ] 5. Verificar que stock disminuyó
- [ ] 6. Ver préstamo en "Préstamos activos"
- [ ] 7. Ver préstamo en "Historial de préstamos"
- [ ] 8. Marcar como devuelto
- [ ] 9. Verificar que stock aumentó
- [ ] 10. Exportar inventario a Excel
- [ ] 11. Generar reporte completo en PDF
- [ ] 12. Ver notificaciones
- [ ] 13. Cerrar sesión
- [ ] 14. Verificar que vuelve al login

---

## ✅ RESUMEN DE TESTING

### Funcionalidades Críticas
- [ ] Autenticación funciona correctamente
- [ ] Datos persisten en localStorage
- [ ] CRUD de herramientas funciona
- [ ] CRUD de préstamos funciona
- [ ] Stock se actualiza automáticamente
- [ ] Exportaciones funcionan (PDF y Excel)
- [ ] Validaciones previenen errores
- [ ] Notificaciones toast aparecen correctamente

### Validaciones
- [ ] No se pueden agregar herramientas sin datos
- [ ] No se pueden registrar préstamos sin stock
- [ ] Fechas de devolución deben ser posteriores
- [ ] Confirmaciones antes de eliminar/devolver

### UX
- [ ] Loading states visibles
- [ ] Mensajes de error claros
- [ ] Mensajes de éxito confirmatorios
- [ ] Interfaz responsive
- [ ] Navegación fluida

---

## 🐛 REPORTE DE BUGS

Si encuentras algún problema, anota aquí:

### Bug 1:
- **Descripción:**
- **Pasos para reproducir:**
- **Comportamiento esperado:**
- **Comportamiento actual:**

### Bug 2:
- **Descripción:**
- **Pasos para reproducir:**
- **Comportamiento esperado:**
- **Comportamiento actual:**

---

## ✅ CONCLUSIÓN

**Total de checks:** 100+
**Checks completados:** ___
**Bugs encontrados:** ___
**Estado general:** ___

**Fecha de testing:** ___________
**Testeado por:** ___________

---

## 📝 NOTAS ADICIONALES

Agrega aquí cualquier observación o sugerencia:
