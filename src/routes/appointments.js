const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

const { authenticateToken, checkRoles } = require('../middlewares/auth');
const { validateIdUserSchema } = require('../middlewares/validatorHandler');

router.get(
  '/:id/appointments',
  validateIdUserSchema,
  authenticateToken,
  checkRoles('ADMIN', 'USER'),
  appointmentController.getUserAppointments
);

module.exports = router;
