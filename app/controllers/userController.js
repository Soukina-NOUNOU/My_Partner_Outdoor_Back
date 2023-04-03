const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');

const userController = {

  // View a user profil
  async getOne (req, res, next) {
    const id = Number(req.params.id);
    const results = await dataMapper.userFindByPk(id);
    
    if(!results) {
      const err = new APIError(`Can not find user profil with id : ${id}`, 400);
      return next(err);
  };

  res.status(200).json(results); 
  },

  // Create a user profil
  async create (req, res, next) {
    const user = req.body;
    const results = await dataMapper.userCreate(user);
    
    if(!results) {
      const err = new APIError(`Can not create a user profil`, 400);
      return next(err);
    };

    res.status(200).json(results);
  },

  // Modify a user profil
  async mofify (req, res, next) {
    const id = Number(req.params.id);
    const user = req.body;
    const results = await dataMapper.userModify(id, user);
    
    if(!results) {
      const err = new APIError(`Can not modify user profil with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(results);
  },

  // Delete a user profil
  async delete (req, res, next) {
    const id = Number(req.params.id);
    const results = await dataMapper.userDelete(id);
    if(!results) {
      const err = new APIError(`Can not delete a user profil`, 400);
      return next(err);
    };

    res.status(200).json(results);
  },

};

module.exports = userController;