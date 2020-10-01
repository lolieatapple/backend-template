var MongoClient = require('mongodb').MongoClient;
var url = process.env.BRG_MONGO_DB;

class DbService {
  dbo;
  async init() {
  }

  find = async ({pageIndex = 0, pageSize = 10}) => {
  }

  insertOne = async (obj) => {
  }

  getOne = async ({ id }) => {
  }

  getManyByStatus = async ({status}) => {
  }

  updateOne = async ({obj}) => {

  }

  deleteOne = async ({id}) => {

  }
}

let service;
module.exports = async function () {
  if (!service) {
    service = new DbService();
    await service.init();
  }
  return service;
};