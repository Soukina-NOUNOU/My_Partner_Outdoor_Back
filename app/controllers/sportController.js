const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');

const sportController = {
  // Return all Sport
  async getAll (_, res, next) {
    const results = await dataMapper.sportFindAll();
    
    if(!results || results.length === 0) {
      const err = new APIError(`Can not find sport`, 400);
      return next(err);
  };
  res.status(200).json(results); 
  },
}

module.exports = sportController;