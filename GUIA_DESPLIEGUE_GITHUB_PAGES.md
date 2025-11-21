# 🚀 Guía para Desplegar en GitHub Pages

## 📋 Pasos para Configurar GitHub Pages

### 1. Instalar gh-pages
```bash
npm install --save-dev gh-pages
```

### 2. Actualizar package.json

Agrega estas líneas a tu `package.json`:

```json
{
  "homepage": "https://marioalexander1.github.io/gestion-inventario-prestamos",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

**IMPORTANTE:** Reemplaza `marioalexander1` con tu nombre de usuario de GitHub.

### 3. Construir y Desplegar

Ejecuta estos comandos en orden:

```bash
# 1. Construir la aplicación
npm run build

# 2. Desplegar a GitHub Pages
npm run deploy
```

### 4. Configurar GitHub Pages en tu Repositorio

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona la rama `gh-pages`
5. Click en **Save**

### 5. Esperar y Acceder

- Espera 2-5 minutos
- Tu sitio estará disponible en: `https://marioalexander1.github.io/gestion-inventario-prestamos`

---

## 🔧 Solución al Problema del README

El problema que tienes es que GitHub Pages está mostrando el README.md en lugar de tu aplicación React.

### Solución:

1. **Asegúrate de que el archivo `package.json` tenga la configuración correcta:**

```json
{
  "homepage": "https://TU-USUARIO.github.io/gestion-inventario-prestamos"
}
```

2. **Crea un archivo `.nojekyll` en la carpeta `public`:**

Este archivo le dice a GitHub Pages que no use Jekyll (que es lo que muestra el README).

3. **Despliega con el comando:**

```bash
npm run deploy
```

---

## 📝 Comandos Completos

```bash
# Paso 1: Instalar dependencia
npm install --save-dev gh-pages

# Paso 2: Construir
npm run build

# Paso 3: Desplegar
npm run deploy
```

---

## ⚠️ Problemas Comunes

### Problema 1: Sigue mostrando el README
**Solución:** 
- Verifica que en GitHub Settings → Pages esté seleccionada la rama `gh-pages`
- Espera unos minutos y limpia el caché del navegador (Ctrl + Shift + R)

### Problema 2: Página en blanco
**Solución:**
- Verifica que el `homepage` en package.json sea correcto
- Asegúrate de que el archivo `.nojekyll` exista en la carpeta `public`

### Problema 3: Rutas no funcionan
**Solución:**
- Usa HashRouter en lugar de BrowserRouter (si es necesario)

---

## 🎯 Resultado Esperado

Cuando alguien visite tu link de GitHub Pages, verá:
- ✅ Pantalla de login directamente
- ✅ Sin README
- ✅ Aplicación funcionando completamente

---

## 🔄 Actualizar el Sitio

Cada vez que hagas cambios:

```bash
npm run deploy
```

Esto automáticamente:
1. Construye la aplicación
2. Sube los cambios a GitHub Pages
3. Actualiza tu sitio en 2-5 minutos

---

## 📱 Verificar que Funciona

1. Abre: `https://TU-USUARIO.github.io/gestion-inventario-prestamos`
2. Deberías ver el login inmediatamente
3. Ingresa con: `admin` / `admin123`
4. ¡Listo!
