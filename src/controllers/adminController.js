const {
  createTimeBlockService,
  listReservationsService,
} = require('../services/adminService');

async function createTimeBlock(req, res) {
  try {
    const { startTime, endTime } = req.body;
    const timeBlock = await createTimeBlockService(startTime, endTime);
    res
      .status(201)
      .json({ message: 'Time block created successfully', timeBlock });
  } catch (error) {
    console.error('Error creating time block:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function listReservations(req, res) {
  try {
    const reservations = await listReservationsService();
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error listing reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createTimeBlock,
  listReservations,
};
