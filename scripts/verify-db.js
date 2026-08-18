const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Probando conexión a la base de datos PostgreSQL...');
  
  try {
    // Probar consulta básica
    const [
      userCount,
      productCount,
      categoryCount,
      orderCount,
      planCount,
      videoCount,
      articleCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.trainingPlan.count(),
      prisma.video.count(),
      prisma.article.count()
    ]);

    console.log('✅ Conexión exitosa a PostgreSQL.');
    console.log('📊 Resumen de tablas y registros:');
    console.log(` - Usuarios (User): ${userCount}`);
    console.log(` - Productos (Product): ${productCount}`);
    console.log(` - Categorías (Category): ${categoryCount}`);
    console.log(` - Pedidos (Order): ${orderCount}`);
    console.log(` - Planes de entrenamiento (TrainingPlan): ${planCount}`);
    console.log(` - Videos (Video): ${videoCount}`);
    console.log(` - Artículos (Article): ${articleCount}`);
    console.log('\n✨ Todas las tablas principales fueron verificadas con éxito en la nueva base de datos.');
  } catch (error) {
    console.error('❌ Error al conectar o consultar la base de datos:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
