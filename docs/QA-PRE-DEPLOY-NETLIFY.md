# Informe QA – Pre-despliegue Netlify

**Proyecto:** mouse-3d-lp (AURA – Precision Gaming Technology)  
**Entorno objetivo:** Netlify  
**Fecha:** 2025-03-18

---

## Resumen ejecutivo

Se revisó el proyecto como QA previo al despliegue en Netlify. Se aplicaron **correcciones críticas** para que el build y el enrutado SPA funcionen correctamente, y se documentan **mejoras recomendadas** para siguientes iteraciones.

---

## Cambios ya aplicados (listos para desplegar)

### 1. Configuración Netlify
- **Creado `netlify.toml`** con:
  - `build.command`: `npm run build`
  - `publish`: `dist`
  - `NODE_VERSION`: `20` (alineado con `package.json` engines)
  - Redirect SPA: `/* → /index.html` (status 200) para vue-router en modo history
  - Cabeceras de caché para `/assets/*` y seguridad básica para HTML

### 2. `index.html`
- **`lang=""`** → **`lang="en"`** (accesibilidad y SEO).
- **Favicon:** `href="/public/auralogo.svg"` → **`href="/auralogo.svg"`** (en Vite, `public/` se sirve en la raíz).
- **Meta description** añadida para SEO y redes sociales.
- **Fuente Inter** movida aquí con `preconnect` para reducir bloqueos y advertencias de CSS.

### 3. CSS (`src/main.css`)
- Eliminados **duplicados** de `@import` de Inter y de directivas `@tailwind`.
- Eliminado `@import` de fuentes del CSS para evitar la advertencia *“@import rules must precede all rules”* en build.

### 4. Producción
- **Vue DevTools** solo en desarrollo: en `vite.config.ts` el plugin se carga con `mode === 'development'`.
- **`console.log`** eliminados de `App.vue` y `src/pages/home.vue` (handlers dejados como TODO para futura lógica).

---

## Build actual

- **Comando:** `npm run build` (type-check + vite build).
- **Resultado:** correcto (exit code 0).
- **Salida:** carpeta `dist/` con `index.html` y `assets/`.

**Advertencia que sigue apareciendo (no bloqueante):**
- *“Some chunks are larger than 500 kB”* (JS ~1.15 MB). Ver sección “Rendimiento” más abajo.

---

## Recomendaciones antes / después del primer deploy

### Alta prioridad

1. **Probar el deploy en Netlify**
   - Conectar el repo y desplegar con la configuración por defecto (Netlify usará `netlify.toml`).
   - Comprobar que la ruta raíz y cualquier ruta directa (ej. `/ruta`) cargan el SPA y no devuelven 404.

2. **Formulario de reservas**
   - Los handlers de reserva y de otros botones son placeholders (TODO). Si quieres enviar datos a un backend, configurar la URL (por ejemplo con `VITE_API_URL` en variables de entorno en Netlify) y reemplazar los TODO por la llamada real.

### Media prioridad (rendimiento y SEO)

3. **Tamaño del bundle y code-splitting**
   - Ya aplicado code-splitting:
     - `dynamic import()` para la ruta `home` (`src/router/index.ts`).
     - Carga perezosa de `ProductSlider` y del modal `SpecsModal` (`defineAsyncComponent` en `src/pages/home.vue` y `src/components/ProductSlider.vue`).
   - Aun así aparece un chunk grande (por componentes pesados de 3D). Si lo necesitas, el siguiente paso es afinar `manualChunks` en `vite.config.ts` para separar dependencias de Three/Tres y reducir el chunk más pesado.

4. **Modelos 3D (GLB)**
   - Varios GLB son muy pesados (por ejemplo ~25 MB uno de ellos). Valorar:
     - Comprimir/optimizar GLB (Draco, reducción de polígonos).
     - Cargar bajo demanda (solo el modelo de la slide visible).
     - CDN o almacenamiento externo si Netlify tiene límites de tamaño de deploy.

5. **SEO y redes sociales**
   - Añadir Open Graph y Twitter Cards en `index.html` (meta `og:title`, `og:description`, `og:image`, `twitter:card`, etc.) cuando tengas imagen y copy definitivos.

### Baja prioridad

6. **Accesibilidad**
   - Revisar contraste, foco en teclado y atributos `aria-*` en componentes interactivos (menú flotante, slider, modales).

7. **i18n**
   - Si la landing es multiidioma, asegurar que `lang` en `<html>` o el atributo por ruta coincida con el locale activo.

8. **Variables de entorno**
   - Si en el futuro usas `import.meta.env.VITE_*`, configurarlas en Netlify (Site settings → Environment variables) y no commitear `.env` con secretos.

---

## Checklist rápido pre-deploy

- [x] `netlify.toml` creado y con redirect SPA
- [x] `npm run build` pasa sin errores
- [x] Favicon y meta básicos en `index.html`
- [x] Sin `console.log` en producción
- [x] Vue DevTools solo en dev
- [ ] Probar deploy en Netlify y rutas directas
- [ ] (Opcional) Backend o analytics para reservas
- [ ] (Opcional) Optimizar chunks y modelos 3D

---

## Cómo desplegar en Netlify

1. Sube el repo a GitHub/GitLab/Bitbucket.
2. En Netlify: **Add new site → Import an existing project**.
3. Elige el repo; Netlify detectará `netlify.toml` (build command y publish directory).
4. Si quieres usar Node 20, en Netlify suele bastar con `NODE_VERSION=20` en variables de entorno o en `netlify.toml` (ya incluido).
5. Deploy; revisar que la URL raíz y una ruta directa carguen el SPA correctamente.

Si necesitas un dominio propio, configúralo en **Domain management** después del primer deploy.
