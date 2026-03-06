# OrangeProject

Proyecto de pruebas automatizadas para OrangeHRM utilizando Playwright y K6.

## Descripción

Este proyecto contiene pruebas automatizadas para la aplicación OrangeHRM, incluyendo pruebas de API, E2E y rendimiento.

- **API Tests**: Pruebas de la API de empleados usando Playwright.
- **E2E Tests**: Pruebas end-to-end de funcionalidades como login y gestión de empleados.
- **Performance Tests**: Pruebas de rendimiento del login usando K6.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

## Configuración

- **Base URL**: `https://opensource-demo.orangehrmlive.com`
- **Playwright Config**: `playwright.config.ts`
- **Umbrales de Rendimiento**: Definidos en `tests/performance/config/thresholds.ts`

## Scripts de Ejecución

### Ejecutar todas las pruebas de Playwright
```bash
npm run tests
```

### Ejecutar pruebas E2E (Chromium)
```bash
npm run e2e-test
```

### Ejecutar pruebas de API
```bash
npm run api-test
```

### Ejecutar prueba de rendimiento (1 VU, 10s)
```bash
npm run p1-test
```

### Ejecutar prueba de rendimiento completa
```bash
npm run p-test
```

## Estructura del Proyecto

- `pages/`: Page Objects para pruebas E2E.
- `tests/api/`: Pruebas de API.
- `tests/e2e/`: Pruebas end-to-end.
- `tests/performance/`: Pruebas de rendimiento con K6.
- `utils/`: Utilidades y enums.
- `assets/`: Recursos estáticos.

## Dependencias

- `@playwright/test`: Para pruebas de API y E2E.
- `k6`: Para pruebas de rendimiento.

## Umbrales de Rendimiento

- Duración del login (95%): < 3000ms
- Errores de login: < 5%
- Duración de requests HTTP (99%): < 5000ms

## Reportes

- Playwright genera reportes HTML en `playwright-report/`.
- K6 muestra resultados en consola.