// src/controllers/fee.js
const { Router } = require('express');
const axios = require('axios');
const cc = require('../utils/cc');


class Fee {
  async init() {
    const router = Router();
    router.get('/btc', this.btc);
    return router;
  }

  btc = cc(async (req, res) => {
    let feerate = await axios.get('https://bitcoinfees.earn.com/api/v1/fees/recommended');
    console.log('feerate', feerate.data);
    feerate.data.fee = feerate.data.fastestFee * 512;
    if (feerate.data.fee > 1e4) {
      feerate.data.fee = Number(feerate.data.fee/1e4).toFixed(0)*1e4;
    }
    global.btcFee = feerate.data.fee;
    res.send({success: true, data: feerate.data});
  });
}

module.exports = async () => {
  const c = new Fee();
  return await c.init();
};
