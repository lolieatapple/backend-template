// src/controllers/index.js
const { Router } = require('express');
const orderController = require('./order');
const healthController = require('./health');
const feeController = require('./fee');

module.exports = async function initControllers() {
  const router = Router();
  router.use('/api/order', await orderController());
  router.use('/api/health', await healthController());
  router.use('/api/fee', await feeController());
  return router;
};
