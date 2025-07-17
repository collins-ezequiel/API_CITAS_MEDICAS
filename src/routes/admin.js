const express = require('express');
const router = express.Router();

const {
  createTimeBlock,
  listReservations,
} = require('../controllers/adminController');

const { authenticateToken, checkRoles } = require('../middlewares/auth');

router.post(
  '/time-blocks',
  authenticateToken,
  checkRoles('ADMIN'),
  createTimeBlock
);
router.get(
  '/reservations',
  authenticateToken,
  checkRoles('ADMIN'),
  listReservations
);

module.exports = router;
