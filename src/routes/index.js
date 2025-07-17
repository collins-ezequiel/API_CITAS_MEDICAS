const express = require('express');

// Rutas
const homeRouter = require('./home');
const appointments = require('./appointments');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const reservationsRouter = require('./reservations');

function apiRoutes(app) {
  const router = express.Router();
  app.use('/', router);
  router.use('/', homeRouter);
  router.use('/auth', authRouter);
  router.use('/users', appointments);
  router.use('/admin', adminRouter);
  router.use('/reservations', reservationsRouter);
}

module.exports = apiRoutes;
