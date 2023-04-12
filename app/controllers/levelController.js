const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');

const levelController = {
  // Return all level
  async getAll (_, res, next) {
    const results = await dataMapper.levelFindAll();
    
    if(!results || results.length === 0) {
      const err = new APIError(`Can not find level`, 400);
      return next(err);
  };
  res.status(200).json(results); 
  },
}

module.exports = levelController;