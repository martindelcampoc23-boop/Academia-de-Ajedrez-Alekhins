# PRODUCTION CHECKLIST: ACADEMIA DE AJEDREZ ALEKHINS

## 1. Claves de Entorno & Producción
- [ ] Sustituir `sk_test_mock_alekhins_key` por clave secreta real `sk_live_...` en Stripe.
- [ ] Configurar `STRIPE_WEBHOOK_SECRET` con la firma generada en el dashboard de Stripe en producción.
- [ ] Definir `NEXTAUTH_SECRET` con una cadena aleatoria criptográficamente segura.
- [ ] Configurar la URL final de producción en `NEXT_PUBLIC_SITE_URL` (ej. `https://alekhins.com`).

## 2. Base de Datos en Producción
- [ ] Migrar la cadena de conexión de `DATABASE_URL` a PostgreSQL en la nube (ej. Supabase / Neon / AWS RDS).
- [ ] Ejecutar `npx prisma db push` o `npx prisma migrate deploy` en el entorno de staging/producción.

## 3. SEO & Dominio
- [ ] Registrar dominio oficial y verificar certificado SSL/TLS.
- [ ] Registrar la propiedad en Google Search Console y enviar `sitemap.xml`.
- [ ] Configurar eventos de e-commerce en Google Analytics 4 (GA4 ID).

## 4. Verificación de Envíos & Paqueterías
- [ ] Configurar credenciales API reales de Estafeta / DHL Express para cotización dinámica.
- [ ] Definir las tarifas fijas de envío por zona si aplica.
