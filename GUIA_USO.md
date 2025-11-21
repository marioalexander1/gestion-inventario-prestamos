# 📖 Guía de Uso - Sistema de Gestión de Inventario y Préstamos

## 🚀 Inicio Rápido

### 1. Iniciar la Aplicación

```bash
cd gestion-inventario-prestamos
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

---

## 🔐 Inicio de Sesión

### Usuarios de Prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin` | `admin123` | Administrador |
| `obed_alvarado` | `obed123` | Usuario |
| `usuario` | `usuario123` | Usuario Demo |

### Pasos:
1. Ingresa el usuario y contraseña
2. Haz clic en "Iniciar Sesión"
3. Tu sesión se guardará automáticamente

---

## 📦 Gestión de Inventario

### Ver Inventario
- Accede desde el menú lateral: **"Inventario existente"**
- Verás una tabla con todas las herramientas
- Puedes ordenar y filtrar las columnas

### Agregar Nueva Herramienta
1. Haz clic en **"Agregar Nueva Herramienta"**
2. Completa el formulario:
   - **Nombre:** Nombre de la herramienta (obligatorio)
   - **Categoría:** Selecciona una categoría (obligatorio)
   - **Marca:** Marca de la herramienta (obligatorio)
   - **Stock Total:** Cantidad inicial (debe ser > 0)
3. Haz clic en **"Agregar"**
4. Verás una notificación de éxito

### Editar Herramienta
1. Haz clic en el ícono de **lápiz (✏️)** en la fila de la herramienta
2. Modifica los campos necesarios
3. Puedes ajustar el **Stock Disponible** y **Stock Total**
4. Haz clic en **"Guardar Cambios"**

### Eliminar Herramienta
1. Haz clic en el ícono de **papelera (🗑️)** en la fila de la herramienta
2. Confirma la eliminación en el diálogo
3. La herramienta se eliminará permanentemente

### Exportar Inventario
- Haz clic en **"Exportar a Excel"**
- El archivo se descargará automáticamente con la fecha actual

---

## 🔄 Gestión de Préstamos

### Ver Préstamos Activos
- Accede desde el menú lateral: **"Préstamos activos"**
- Verás tarjetas con cada préstamo activo
- Los préstamos vencidos se marcan con un chip rojo **"VENCIDO"**

### Registrar Nuevo Préstamo
1. Haz clic en **"Registrar Nuevo Préstamo"**
2. Completa el formulario:
   - **Usuario:** Nombre de quien solicita el préstamo
   - **Herramienta:** Selecciona de las disponibles (solo muestra las que tienen stock)
   - **Fecha de Préstamo:** Por defecto es hoy
   - **Fecha de Devolución:** Debe ser posterior a la fecha de préstamo
3. Haz clic en **"Registrar"**
4. El stock disponible se reducirá automáticamente

### Marcar como Devuelto
1. En la tarjeta del préstamo, haz clic en **"Marcar como Devuelto"**
2. Confirma la devolución en el diálogo
3. El stock disponible se incrementará automáticamente
4. El préstamo pasará al historial

---

## 📚 Historial de Préstamos

### Ver Historial Completo
- Accede desde el menú lateral: **"Historial de préstamos"**
- Verás todos los préstamos (activos y devueltos)

### Filtrar Préstamos
- **Por Estado:** Selecciona "Todos", "Activo" o "Devuelto"
- **Por Búsqueda:** Escribe el nombre del usuario o herramienta
- **Por Fecha:** Selecciona una fecha específica

### Estadísticas
En la parte superior verás:
- **Total Préstamos:** Cantidad total de préstamos registrados
- **Activos:** Préstamos que aún no se han devuelto
- **Devueltos:** Préstamos completados
- **Vencidos:** Préstamos activos que pasaron su fecha de devolución

---

## 📊 Reportes

### Ver Reportes Visuales
- Accede desde el menú lateral: **"Reportes"**
- Verás gráficos de:
  - Herramientas por categoría (gráfico de barras)
  - Estado de stock (gráfico circular)
  - Estadísticas numéricas

### Generar Reportes Descargables
- Accede desde el menú lateral: **"Generar reportes"**

#### Configurar Reporte
1. **Tipo de Reporte:**
   - Inventario de Herramientas
   - Préstamos
   - Reporte Completo

2. **Formato de Exportación:**
   - PDF (con tablas formateadas)
   - Excel (archivo .xlsx)

3. **Filtros (solo para Préstamos):**
   - Fecha Desde
   - Fecha Hasta

4. Haz clic en **"Generar Reporte"**

#### Accesos Rápidos
Usa los botones de acceso rápido para exportar directamente:
- **Inventario PDF**
- **Inventario Excel**
- **Préstamos PDF**
- **Préstamos Excel**

---

## 🔔 Notificaciones

### Ver Notificaciones
- Accede desde el menú lateral: **"Notificaciones"**
- Verás alertas sobre:
  - Herramientas con stock bajo (< 3 unidades)
  - Herramientas sin stock
  - Préstamos vencidos
  - Préstamos próximos a vencer (dentro de 3 días)
  - Recordatorios de mantenimiento
  - Resumen general del sistema

---

## 🔐 Cerrar Sesión

1. Haz clic en **"Cerrar sesión"** en el menú lateral
2. Confirma en el diálogo
3. Serás redirigido a la pantalla de login
4. Tus datos se mantendrán guardados para la próxima sesión

---

## 💾 Persistencia de Datos

### Datos Guardados Automáticamente
- ✅ Todas las herramientas agregadas
- ✅ Todos los préstamos registrados
- ✅ Tu sesión de usuario
- ✅ Los datos persisten al cerrar el navegador

### Ubicación de los Datos
Los datos se guardan en el **localStorage** de tu navegador.

### Limpiar Datos
Si necesitas empezar de cero:
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Application" o "Almacenamiento"
3. Busca "Local Storage"
4. Elimina las claves que empiezan con `inventory_`

---

## ⚠️ Validaciones y Reglas

### Inventario
- ❌ No puedes agregar herramientas sin nombre
- ❌ El stock total debe ser mayor a 0
- ❌ El stock disponible no puede ser mayor al stock total
- ✅ Se marca como "Bajo Stock" si tiene ≤ 2 unidades disponibles

### Préstamos
- ❌ No puedes registrar préstamos sin usuario
- ❌ Solo puedes seleccionar herramientas con stock disponible
- ❌ La fecha de devolución debe ser posterior a la de préstamo
- ✅ Se marca como "Vencido" si pasó la fecha de devolución
- ✅ El stock se actualiza automáticamente

---

## 🎨 Indicadores Visuales

### Estados de Herramientas
- 🟢 **Disponible:** Stock > 2 unidades
- 🟠 **Bajo Stock:** Stock ≤ 2 unidades

### Estados de Préstamos
- 🔵 **Activo:** Préstamo en curso
- 🟢 **Devuelto:** Préstamo completado
- 🔴 **Vencido:** Préstamo activo que pasó su fecha

### Notificaciones Toast
- 🟢 **Verde:** Operación exitosa
- 🔴 **Rojo:** Error o validación fallida
- 🔵 **Azul:** Información general

---

## 🐛 Solución de Problemas

### La aplicación no inicia
```bash
# Reinstalar dependencias
npm install

# Iniciar nuevamente
npm start
```

### Los datos no se guardan
- Verifica que tu navegador permita localStorage
- Revisa que no estés en modo incógnito
- Limpia la caché del navegador

### Error al exportar
- Verifica que tu navegador permita descargas
- Asegúrate de tener permisos de escritura
- Intenta con otro navegador

### No puedo iniciar sesión
- Verifica que estés usando las credenciales correctas
- Intenta con: `admin` / `admin123`
- Limpia el localStorage si persiste el problema

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ⚠️ Internet Explorer (no soportado)

### Dispositivos
- ✅ Desktop (óptimo)
- ✅ Tablet (responsive)
- ✅ Móvil (responsive)

---

## 🔄 Actualizaciones Futuras

### Próximas Funcionalidades (Fase 2)
- 📱 PWA (App instalable)
- 🔔 Notificaciones push
- 📧 Envío de emails
- 🔍 Códigos QR
- 🌐 Backend con API
- 💾 Base de datos real
- 👥 Gestión de usuarios avanzada
- 📊 Dashboard mejorado

---

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:
1. Revisa esta guía
2. Consulta el archivo `CAMBIOS_IMPLEMENTADOS.md`
3. Revisa el archivo `IDEAS_MEJORAS.md` para futuras funcionalidades

---

## 🎉 ¡Disfruta del Sistema!

Ahora tienes un sistema completo de gestión de inventario y préstamos con:
- ✅ Autenticación
- ✅ Persistencia de datos
- ✅ Historial completo
- ✅ Exportación a PDF/Excel
- ✅ Validaciones robustas
- ✅ Interfaz moderna y amigable

**¡Comienza a gestionar tu inventario de manera eficiente!** 🚀
