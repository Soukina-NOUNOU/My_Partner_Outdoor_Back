const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');
const bcrypt = require('bcrypt');

const userController = {

  // Return one user 
  async getOne (req, res, next) {
    const id = req.params.id;
    const results = await dataMapper.userFindByPk(id);
    
    if(!results) {
      const err = new APIError(`Can not find user with id : ${id}`, 400);
      return next(err);
  };

  res.status(200).json(results); 
  },

  // Create one user
  //TODO Check confirm password
  async create (req, res, next) {
    const user = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    const results = await dataMapper.userCreate(user, hash);

    if(!results) {
      const err = new APIError(`Can not create a user`, 400);
      return next(err);
    };

    res.status(200).json(results);
  },

  // Modify one user
  async modify (req, res, next) {
    const id = req.params.id;
    const newUserData = req.body;

    // Compare old and new data
    const user = await dataMapper.userFindByPk(id);
    const fields = ['firstname', 'lastname', 'email', 'password', 'pseudo', 'picture', 'birthday', 'bio'];
    fields.forEach(field => {
      if (newUserData[field]) {
        user[field] = newUserData[field];
      }
    });
    // Check if we have all address fields
    const fieldsAddress = ['number', 'street', 'zip_code', 'city'];
    let checkFields = 0;
    fieldsAddress.forEach(field => {
      if (newUserData[field]) {
        checkFields++;
      }
    });
    // If we have all fields we create Address
    if (checkFields === 4) {
      const address = await dataMapper.addressCreate(newUserData);
      if(!address) {
        const err = new APIError(`Can not modify address for user with id : ${id}`, 400);
        return next(err);
      };
      // Add user to address list
      const userHasAddress = await dataMapper.userCreateHasAddress(user, address);
      if(!userHasAddress) {
        const err = new APIError(`Can not associate user_has_address`, 400);
        return next(err);
      };
    };
    
    const results = await dataMapper.userModify(id, user);
    
    if(!results) {
      const err = new APIError(`Can not modify user with id : ${id}`, 400);
      return next(err);
    };

    res.status(200).json(results);
  },
  // Delete one user
  //TODO Check le retour avec rowCount
  async delete (req, res, next) {
    const id = req.params.id;
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