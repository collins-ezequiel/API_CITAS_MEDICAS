const reservationService = require('../services/reservationService');

exports.createReservation = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservation = await reservationService.createReservation({
      ...req.body,
      userId
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await reservationService.getReservation(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    if (error.message === 'Reservation not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await reservationService.updateReservation(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedReservation);
  } catch (error) {
    if (error.message === 'Reservation not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deleted = await reservationService.deleteReservation(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
