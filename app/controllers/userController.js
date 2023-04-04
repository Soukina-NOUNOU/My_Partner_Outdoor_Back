const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');
const bcrypt = require('bcrypt');

const userController = {

  // Return one user 
  async getOne (req, res, next) {
    const id = Number(req.params.id);
    const results = await dataMapper.userFindByPk(id);
    
    if(!results) {
      const err = new APIError(`Can not find user profil with id : ${id}`, 400);
      return next(err);
  };

  res.status(200).json(results); 
  },

  // Create one user
  async create (req, res, next) {
    const user = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);

    const results = await dataMapper.userCreate(user, hash);

    if(!results) {
      const err = new APIError(`Can not create a user profil`, 400);
      return next(err);
    };

    res.status(200).json(results);
  },

  // Modify one user
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

  // Delete one user
  async delete (req, res, next) {
    const id = Number(req.params.id);
    const results = await dataMapper.userDelete(id);
    if(!results) {
      const err = new APIError(`Can not delete a user profil`, 400);
      return next(err);
    };

    res.status(200).json(results);
  },

  
  // Login one user
  async login (req, res, next) {
    const { email, password } = req.body;
    const resultsEmail = await dataMapper.userLogin(email);
    if(!resultsEmail) {
      const err = new APIError(`Can not login user Invalid email`, 400);
      return next(err);
    };

    const resultsPassword = await bcrypt.compare(password, resultsEmail.password)
    if(!resultsPassword) {
      const err = new APIError(`Can not login user Invalid password`, 400);
      return next(err);
    };

    const userSession = {email: resultsEmail.email, password: resultsPassword.password}
    req.session.user = userSession;
    res.render('test');

  },

  logout (req, res) {
    req.session.user = '';
    res.status(200);
  }
 
};

module.exports = userController;