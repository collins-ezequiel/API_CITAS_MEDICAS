const appointmentService = require('../services/appointmentService');

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.params.id;
    const appointements = await appointmentService.getUserAppointments(userId);
    res.json(appointements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
