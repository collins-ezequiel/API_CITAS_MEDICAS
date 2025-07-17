const { userSchema, idUserSchema } = require('../schemas/userSchema');
const {
  appointmentSchema,
  idAppointmentSchema,
} = require('../schemas/appointmentSchema');

const validateUserSchema = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Invalid user data',
      details: error.details.map((detail) => detail.message),
    });
  }

  next();
};

const validateIdUserSchema = (req, res, next) => {
  const { error } = idUserSchema.validate(req.params);

  if (error) {
    return res.status(400).json({
      message: 'Invalid user ID',
      details: error.details.map((detail) => detail.message),
    });
  }

  next();
};

const validateAppointmentSchema = (req, res, next) => {
  const { error } = appointmentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Invalid appointment data',
      details: error.details.map((detail) => detail.message),
    });
  }

  next();
};

const validateIdAppointmentSchema = (req, res, next) => {
  const { error } = idAppointmentSchema.validate(req.params);

  if (error) {
    return res.status(400).json({
      message: 'Invalid appointment ID',
      details: error.details.map((detail) => detail.message),
    });
  }

  next();
};

module.exports = {
  validateUserSchema,
  validateIdUserSchema,
  validateAppointmentSchema,
  validateIdAppointmentSchema,
};
