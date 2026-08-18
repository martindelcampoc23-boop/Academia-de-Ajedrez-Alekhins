const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'martindelcampoc23@gmail.com'.toLowerCase();
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    user = await prisma.user.update({
      where: { email },
      data: { role: 'SUPERADMIN' },
    });
    console.log('✅ Usuario encontrado y actualizado a SUPERADMIN:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } else {
    console.log('⚠️ Usuario no encontrado con email:', email);
    // Let's list existing users to see if there's any similar email or if they registered with different casing
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true },
    });
    console.log('Usuarios existentes en la base de datos:', allUsers);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
