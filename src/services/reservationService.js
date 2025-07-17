const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

exports.createReservation = async (data) => {
  const conflict = await prisma.appointment.findFirst({
    where: {
      date: data.date,
      timeBlockId: data.timeBlockId
    }
  });

  if (conflict) {
    throw new Error('El horario ya está ocupado');
  }

  return prisma.appointment.create({
    data: {
      date: data.date,
      timeBlockId: data.timeBlockId,
      userId: data.userId
    }
  });
};

exports.getReservation = async (id) => {
  const existingReservation = await prisma.appointment.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!existingReservation) {
    throw new Error('Reservation not found');
  }
  try {
    const reservation = await prisma.appointment.findUnique({
      where: { id: parseInt(id, 10) },
    });
    return reservation;
  } catch (error) {
    console.error('Error fetching reservation:', error);
    throw new Error('Failed to fetch reservation');
  }
};

exports.updateReservation = async (id, data) => {
  const existingReservation = await prisma.appointment.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!existingReservation) {
    throw new Error('Reservation not found');
  }
  const conflict = await prisma.appointment.findFirst({
    where: {
      date: data.date,
      timeBlockId: data.timeBlockId,
      id: { not: parseInt(id, 10) }, // Exclude the current reservation
    },
  });
  if (conflict) {
    throw new Error('Time slot already booked');
  }
  try {
    const updatedReservation = await prisma.appointment.update({
      where: { id: parseInt(id, 10) },
      data,
    });
    return updatedReservation;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw new Error('Failed to update reservation');
  }
};

exports.deleteReservation = async (id) => {
  try {
    const deleted = await prisma.appointment.delete({
      where: { id: parseInt(id, 10) },
    });
    return deleted;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw new Error('Failed to delete reservation');
  }
};
