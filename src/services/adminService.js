const { PrismaClient } = require('../../generated/prisma');
const prisma = new PrismaClient();

const createTimeBlockService = async (startTime, endTime) => {
  try {
    const timeBlock = await prisma.timeBlock.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
    return timeBlock;
  } catch (error) {
    console.error('Error creating time block:', error);
    throw new Error('Failed to create time block');
  }
};

const listReservationsService = async () => {
  try {
    const reservations = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        timeBlock: {
          select: {
            id: true,
            startTime: true,
            endTime: true,
          },
        },
      },
      orderBy: {
        timeBlock: {
          startTime: 'asc',
        },
      },
    });
    return reservations;
  } catch (error) {
    console.error('Error listing reservations:', error);
    throw new Error('Failed to list reservations');
  }
};

module.exports = {
  createTimeBlockService,
  listReservationsService,
};
