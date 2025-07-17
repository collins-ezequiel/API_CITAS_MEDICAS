const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/reservationController');
const { authenticateToken, checkRoles } = require('../middlewares/auth');

const {
  validateAppointmentSchema,
  validateIdAppointmentSchema,
} = require('../middlewares/validatorHandler');
const { idAppointmentSchema } = require('../schemas/appointmentSchema');

router.post(
  '/',
  validateAppointmentSchema,
  authenticateToken,
  checkRoles('ADMIN', 'USER'),
  reservationController.createReservation
);
router.get(
  '/:id',
  validateIdAppointmentSchema,
  authenticateToken,
  checkRoles('ADMIN', 'USER'),
  reservationController.getReservation
);
router.put(
  '/:id',
  validateIdAppointmentSchema,
  validateAppointmentSchema,
  authenticateToken,
  checkRoles('ADMIN', 'USER'),
  reservationController.updateReservation
);
router.delete(
  '/:id',
  validateIdAppointmentSchema,
  authenticateToken,
  checkRoles('ADMIN'),
  reservationController.deleteReservation
);

module.exports = router;
