const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.getUserAppointments = async (userId) => {
  try {
    const appointements = await prisma.appointment.findMany({
      where: { userId: parseInt(userId) },
      include: { timeBlock: true },
    });
    return appointements;
  } catch (error) {
    throw new Error('Error al obtener el historial de citas.');
  }
};
