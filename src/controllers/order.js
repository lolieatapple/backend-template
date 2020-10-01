const { Router } = require('express');
const bodyParser = require('body-parser');
const orderService = require('../services/order');
const { createOrderFormSchema } = require('../moulds/OrderForm');
const cc = require('../utils/cc');

class OrderController {
  orderService;

  async init() {
    this.orderService = await orderService();

    const router = Router();
    router.get('/', this.getAll);
    router.get('/:orderId', this.getOne);
    router.post('/', bodyParser.json({ inflate: true }), this.create);
    return router;
  }

  getAll = cc(async (req, res) => {
    const { pageIndex, pageSize } = req.query;
    const orderList = await this.orderService.find({ pageIndex, pageSize });
    console.log('getAll', orderList);
    res.send({ success: true, data: orderList });
  });

  getOne = cc(async (req, res) => {
    const { orderId } = req.params;
    console.log('getOne', orderId);
    const orderList = await this.orderService.findOne({ id: orderId });

    if (orderList.length) {
      res.send({ success: true, data: orderList[0] });
    } else {
      res.status(404).send({ success: false, data: null });
    }
  });

  create = cc(async (req, res) => {
    console.log('body', req.body);
    const { id, user, amount, type, symbol, release, p2sh } = req.body;

    try {
      await createOrderFormSchema().validate({ user, amount, type, symbol });
    } catch (e) {
      console.log('validate err', e);
      res.status(400).send({ success: false, message: e.message });
      return;
    }

    const orderInfo = await this.orderService.create({ values: { id, user, amount, type, symbol, release, p2sh } });
    if (!orderInfo) {
      res.status(400).send({ success: false, message: "Check signature failed" });
      return;
    }

    res.send({ success: true, data: orderInfo });
  });
}

module.exports = async () => {
  const c = new OrderController();
  return await c.init();
};