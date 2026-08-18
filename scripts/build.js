const { execSync } = require('child_process');



console.log('🚀 [Build] Ensuring Prisma Client is generated...');
try {
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });
} catch (err) {
  console.warn('⚠️ [Build] prisma generate note:', err.message);
}

console.log('📦 [Build] Syncing database schema...');
try {
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', env: process.env });
  console.log('🌱 [Build] Seeding initial database records...');
  execSync('node prisma/seed.js', { stdio: 'inherit', env: process.env });
} catch (err) {
  console.warn('⚠️ [Build] Notice: Database push/seed note:', err.message);
}

console.log('⚡ [Build] Compiling Next.js production build...');
execSync('npx next build', { stdio: 'inherit', env: process.env });
