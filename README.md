# mouse-3d-lp

Landing page de producto para periféricos gaming (mouse Aura Pro, Aura Air, Aura X). Incluye modelos 3D interactivos, slider de productos con especificaciones por modelo y secciones de reserva y countdown.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 7**
- **TypeScript**
- **Tailwind CSS v4** (configuración con `@theme` en CSS)
- **TresJS** (`@tresjs/core` + `@tresjs/cientos`) para escenas 3D y modelos GLB
- **Vue Router**
- **Pinia**

## Estructura del proyecto

```
src/
├── App.vue
├── main.ts
├── main.css           # Estilos globales + @theme (Tailwind, animaciones, colores)
├── HeroModel.vue      # Modelo 3D del hero (TresCanvas + useGLTF)
├── pages/
│   └── home.vue       # Página principal (ensambla todas las secciones)
├── components/
│   ├── HeroComponent.vue      # Hero con título, CTA y fondo animado
│   ├── MarqueeSection.vue      # Banda de texto en bucle
│   ├── ProductSlider.vue      # Slider de productos con visor 3D por slide
│   ├── SpecsModal.vue         # Modal de especificaciones (por producto)
│   ├── FeaturesSection.vue    # Sección de características
│   ├── CountdownSection.vue   # Countdown
│   ├── ReservationSection.vue # Reserva / formulario
│   └── ui/
│       └── FloatingActionMenu.vue  # Menú flotante (ej. cuenta, ajustes)
├── layout/
│   ├── MainNavbar.vue
│   └── MainFooter.vue
└── assets/
    └── models/        # Modelos .glb para TresJS (gaming_mouse.glb, etc.)
```

## Funcionalidades principales

- **Hero:** texto, botones y fondo con gradiente animado (CSS).
- **Modelo 3D en hero:** `HeroModel.vue` carga un GLB con TresJS (cámara, luces, OrbitControls).
- **Marquee:** texto que se desplaza de forma infinita (animación en `@theme`).
- **Product Slider:** cada slide tiene título, descripción, features, **modelo 3D propio** y botón “Ver especificaciones”. La cámara, luces y controles de órbita son configurables por slide (`scene` y `specs` en cada slide).
- **Modal de especificaciones:** se abre al hacer clic en el botón del slide; título, subtítulo y secciones son personalizables por producto (`specs` en el slide).
- **Countdown y reserva:** secciones de conversión.
- **Menú flotante:** acciones rápidas (cuenta, ajustes, etc.).

## Requisitos

- **Node.js** `^20.19.0` o `>=22.12.0` (ver `package.json` → `engines`).

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo (hot-reload)
npm run dev

# Type-check + build para producción
npm run build

# Vista previa del build
npm run preview

# Lint
npm run lint

# Formatear código
npm run format
```

## Modelos 3D

Los modelos se referencian desde `src/assets/models/` (por nombre de archivo, p. ej. `gaming_mouse.glb`) o desde `public/` con ruta absoluta (p. ej. `/models/mouse.glb`). En `ProductSlider` cada slide define `modelSrc` y opcionalmente `scene` (posición de cámara, luces, auto-rotate, etc.).

## IDE recomendado

[VS Code](https://code.visualstudio.com/) con la extensión [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y Vetur desactivado). Para tipos en `.vue` hace falta [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

## Configuración

- **Vite:** `vite.config.ts`
- **Tailwind v4:** tema y animaciones en `src/main.css` (`@theme { ... }`); no se usa `tailwind.config.ts` por defecto en v4.
