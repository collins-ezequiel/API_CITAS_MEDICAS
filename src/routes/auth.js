const express = require('express');
const router = express.Router();

const { register, login } = require('./../controllers/authController');
const { validateUserSchema } = require('../middlewares/validatorHandler');

router.post('/register', validateUserSchema, register);
router.post('/login', login);

module.exports = router;
