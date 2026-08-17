# Academia de Ajedrez Alekhins

Plataforma web integral, moderna y de alto rendimiento para la **Academia de Ajedrez Alekhins**, bajo la dirección técnica del **Maestro Internacional Roberto Martín del Campo Cárdenas**.

---

## 🌟 Características Principales

1. **Academia & Formación**: Planes de entrenamiento por niveles (Iniciación, Desarrollo y Alto Rendimiento) con comparador interactivo, test de nivel y gestión transparente de suscripciones.
2. **Tienda E-Commerce Especializada**: Catálogo certificado de sets de torneo, tableros de vinil y madera, piezas pesadas Staunton #6, relojes digitales DGT 2010/3000 y libros de entrenamiento.
3. **Perfil del Fundador & CV Interactivo**: Trayectoria profesional, biografía y currículum vitae interactivo del MI Roberto Martín del Campo Cárdenas.
4. **Videoteca & Recursos**: Clases comentadas, lecciones de cálculo, táctica, estrategia y repertorio PGN descargables.
5. **Atención a Clubes y Escuelas**: Cotizador institucional B2B para paquetes de 5, 10, 20 y 50 jugadores.
6. **Seguridad Estricta & Stripe**: Recálculo obligatorio de precios e impuestos en servidor, prevención de manipulación de precios en cliente y firmado de webhooks con idempotencia.
7. **Panel de Admin, CMS & CRM**: Dashboard KPI con métricas de ventas, alertas de bajo stock, editor CMS y pipeline comercial de leads.

---

## 🚀 Guía de Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/tienda-alekhins.git
cd tienda-alekhins

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Sincronizar y sembrar la base de datos (SQLite / PostgreSQL)
npm run db:push
npm run db:seed

# 5. Ejecutar suite de pruebas unitarias
npm test

# 6. Iniciar servidor de desarrollo
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) en su navegador para explorar la aplicación.
