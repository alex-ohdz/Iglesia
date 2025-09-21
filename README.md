# Iglesia

Este proyecto utiliza [Next.js](https://nextjs.org/) para la capa de frontend y agrupa la lógica del backend en módulos reutilizables. Toda la aplicación vive dentro del directorio `src`, que ahora se divide en dos áreas bien diferenciadas:

- `src/frontend`: contiene la aplicación de Next.js, componentes, estilos, hooks y la configuración de internacionalización.
- `src/backend`: reúne la lógica de negocio, utilidades de base de datos, gestión de sesiones, servicios de autenticación y operaciones que consumen las rutas API.

La carpeta `src/app` actúa como un puente que expone las rutas del App Router de Next.js y delega la implementación en los módulos ubicados en `src/frontend/app`.

## Comandos disponibles

```bash
pnpm dev       # Inicia el servidor de desarrollo
pnpm build     # Genera la build de producción
pnpm start     # Sirve la build generada
pnpm lint      # Ejecuta las comprobaciones de linting
```

## Estructura principal

```
src/
├── app/                  # Reexporta las rutas del App Router
├── frontend/             # Componentes, estilos y páginas del frontend
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── i18next.config.ts
│   └── styles/
└── backend/              # Servicios y utilidades de backend
    ├── lib/              # Conexión a la base de datos y middleware de sesión
    ├── services/         # Casos de uso de negocio para actividades, carrusel, etc.
    ├── types/            # Tipos compartidos entre API y servicios
    ├── utils/            # Utilidades de apoyo (por ejemplo, manejo de sesiones)
    └── scripts/          # Scripts auxiliares (hash de contraseñas, generador de secretos)
```

Las rutas de la API (`pages/api`) son responsables únicamente de recibir las solicitudes HTTP y delegar el trabajo en los servicios ubicados en `src/backend/services`.

## Desarrollo

Para comenzar a trabajar, instala las dependencias y levanta el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en ejecución. Cualquier cambio dentro de `src/frontend` se refleja automáticamente gracias al hot-reload de Next.js.

## Despliegue

Consulta la [documentación oficial de Next.js](https://nextjs.org/docs/deployment) para conocer las diferentes estrategias de despliegue disponibles.
