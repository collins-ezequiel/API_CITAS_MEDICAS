const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function deleteAll() {
  // Asegúrate de que los nombres coincidan con tu DB
  await prisma.$executeRaw`TRUNCATE TABLE "Appointment" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "TimeBlock" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  console.log('Datos eliminados y IDs reiniciados');
}

async function main() {
  // Crear usuarios
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: await hashPassword('user123'),
      name: 'User One',
      role: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@mail.com',
      password: await hashPassword('admin123'),
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Crear bloques de tiempo
  const timeBlock1 = await prisma.timeBlock.create({
    data: {
      startTime: new Date(new Date().setDate(new Date().getDate())), // Hoy
      endTime: new Date(new Date().setDate(new Date().getDate() + 1)), // Mañana
    },
  });

  const timeBlock2 = await prisma.timeBlock.create({
    data: {
      startTime: new Date(new Date().setDate(new Date().getDate())), // Hoy
      endTime: new Date(new Date().setDate(new Date().getDate() + 2)), // Dentro de dos días
    },
  });

  // Crear citas
  await prisma.appointment.create({
    data: {
      date: new Date(new Date().setDate(new Date().getDate() - 1)), // Ayer
      user: { connect: { id: user1.id } },
      timeBlock: { connect: { id: timeBlock1.id } },
    },
  });

  await prisma.appointment.create({
    data: {
      date: new Date(new Date().setDate(new Date().getDate() - 1)), // Ayer
      user: { connect: { id: user2.id } },
      timeBlock: { connect: { id: timeBlock2.id } },
    },
  });
}

async function seed() {
  try {
    await deleteAll();
    await main();
    console.log('Seed completado');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
