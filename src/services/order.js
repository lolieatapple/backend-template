const dbService = require('./db');

class OrderService {
  db;

  async init() {
    this.db = await dbService();
  }

  async find({ pageIndex = 0, pageSize = 10 }) {
    return await this.db.find({ pageIndex, pageSize });
  }

  async findOne({ id }) {
    return await this.db.getOne({ id });
  }

  async findManyByStatus({ status }) {
    return await this.db.getManyByStatus({ status });
  }

  async create({ values }) {
    await this.db.insertOne(values);

    return values;
  }

  async remove({ id, user }) {
    return await this.db.deleteOne({ id });
  }

  updateOne = async ({ obj }) => {
    if (!obj) {
      return;
    }
    return await this.db.updateOne({ obj });
  }
}

let service;
module.exports = async function () {
  if (!service) {
    service = new OrderService();
    await service.init();
  }
  return service;
};
