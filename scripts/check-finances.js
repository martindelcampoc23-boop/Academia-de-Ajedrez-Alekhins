const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const financeCount = await prisma.financeEntry.count();
    const orderCount = await prisma.order.count();
    const paymentCount = await prisma.payment.count();
    const subscriptionCount = await prisma.subscription.count();
    const shipmentCount = await prisma.shipment.count();

    console.log('Finance status:');
    console.log('- financeEntry:', financeCount);
    console.log('- orders:', orderCount);
    console.log('- payments:', paymentCount);
    console.log('- subscriptions:', subscriptionCount);
    console.log('- shipments:', shipmentCount);

    if (financeCount > 0) {
      const entries = await prisma.financeEntry.findMany();
      console.log('Finance entries:', JSON.stringify(entries, null, 2));
    }

    if (orderCount > 0) {
      const orders = await prisma.order.findMany();
      console.log('Orders:', JSON.stringify(orders, null, 2));
    }
  } catch (err) {
    console.error('Error checking finances:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
