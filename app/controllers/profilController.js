const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');

const profilController = {
  async getOne (req, res, next) {
    const id = Number(req.params.id);
    const results = await dataMapper.findByPk(id);
    
    if(!results) {
      const err = new APIError(`Can not find user with id : ${id}`, 400);
      return next(err);
  };

  res.status(200).json(results); 
  },
  
};

module.exports = profilController;