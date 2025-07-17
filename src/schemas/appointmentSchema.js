const Joi = require('joi');

const appointmentSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'any.required': 'Date is required',
  }),
  timeBlockId: Joi.number().integer().required().messages({
    'number.base': 'Time Block ID must be a number',
    'number.integer': 'Time Block ID must be an integer',
    'any.required': 'Time Block ID is required',
  }),
  userId: Joi.number().integer().optional().messages({
    'number.base': 'User ID must be a number',
    'number.integer': 'User ID must be an integer',
  }),
});
const idAppointmentSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'any.required': 'ID is required',
  }),
});
module.exports = { appointmentSchema, idAppointmentSchema }; // Export the schemas for use in other files
// This schema validates the appointment data structure, ensuring that the date is a valid date,
// the time block ID is a valid integer, and the user ID is optional but must also be a valid integer if provided.
// The `idAppointmentSchema` is used to validate the ID of an appointment when fetching, updating, or deleting it.
// This schema can be used in your controllers or services to validate incoming data before processing it,
// ensuring that the data adheres to the expected format and types, which helps prevent errors and maintain data integrity.
