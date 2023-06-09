const dataMapper = require("../models/dataMapper");
const APIError = require("../middlewares/handlers/APIError");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;

const userController = {
  // Return one user
  async getOne(req, res, next) {
    const id = req.params.id;
    const results = await dataMapper.userFindByPk(id);

    if (!results) {
      const err = new APIError(`Can not find user with id : ${id}`, 400);
      return next(err);
    }

    // Delete password key
    delete results.password;
    res.status(200).json(results);
  },
  // Create one user
  async create(req, res, next) {
    const user = req.body;
    // Check if email already exist
    const userEmail = await dataMapper.userFindByEmail(user.email);
    if (userEmail) {
      const err = new APIError(`Email is already registered`, 400);
      return next(err);
    };

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    const results = await dataMapper.userCreate(user, hash);

    if (!results) {
      const err = new APIError(`Can not create a user`, 400);
      return next(err);
    }
    
    // Return selected sport
    const sport = await dataMapper.sportFindOne(user);

    // Add Sport to user list sport
    const userHasSport = await dataMapper.userCreateHasSport(
      results.id,
      sport.id
    );
    if (!userHasSport) {
      const err = new APIError(`Can not associate user_has_sport`, 400);
      return next(err);
    }
    // Delete password key
    delete results.password;
    res.status(200).json(results);
  },
  // Modify one user
  async modify (req, res, next) {
    const id = parseInt(req.params.id);
    const newUserData = req.body;
    

    // Compare old and new data
    const user = await dataMapper.userFindByPk(id);
    const fields = [
      "firstname",
      "lastname",
      "email",
      "password",
      "pseudo",
      "picture",
      "bio",
      "birthday"
    ];
    fields.forEach((field) => {
      if (newUserData[field]) {
        user[field] = newUserData[field];
      }
    });

    // If we need to Update password
    if (newUserData.password) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(newUserData.password, salt);
      user.password = hash;
    }
    // Check if we have all address fields
    const fieldsAddress = ["number", "street", "zip_code", "city"];
    let checkFields = 0;
    fieldsAddress.forEach((field) => {
      if (newUserData[field]) {
        checkFields++;
      }
    });
    // If all fields to create address return error
    if (checkFields > 0 && checkFields < 4) {
      const err = new APIError(
        `Missing fields to modify address for user with id : ${id}`,
        400
      );
      return next(err);
    }
    // If we have all fields we create Address
    if (checkFields === 4) {
      const address = await dataMapper.addressCreate(newUserData);
      if (!address) {
        const err = new APIError(
          `Can not modify address for user with id : ${id}`,
          400
        );
        return next(err);
      }
      // Add user to address list
      const userHasAddress = await dataMapper.userCreateHasAddress(
        user,
        address
      );
      if (!userHasAddress) {
        const err = new APIError(`Can not associate user_has_address`, 400);
        return next(err);
      }
    }

    const results = await dataMapper.userModify(id, user);

    if (!results) {
      const err = new APIError(`Can not modify user with id : ${id}`, 400);
      return next(err);

    };
    
    // Delete password key
    delete results.password;
    res.status(200).json(results);
  },
  // Delete one user
  async delete(req, res, next) {
    const id = req.params.id;
    const results = await dataMapper.userDelete(id);
    if (results !== 1) {
      const err = new APIError(`Can not delete User`, 400);
      return next(err);
    }

    res.status(200).json(`User with id : ${id} has been deleted`);
  },
  // Login one user
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await dataMapper.userFindByEmail(email);
    if (!user) {
      const err = new APIError(`Can not login user Invalid email`, 400);
      return next(err);
    };

    const resultsPassword = await bcrypt.compare(password, user.password);
    if (!resultsPassword) {
      const err = new APIError(`Can not login user Invalid password`, 400);
      return next(err);
    };

    // Delete password key
    delete user.password;
    // Create token
    const token = jwt.sign(
      {
        user: user,
      },
      JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }
    );
    res.header("Authorization", "Bearer " + token);

    user.token = token;

    res.status(200).json(user);
  },

  logout(req, res) {
    req.session.user = "";
    res.status(200);
  },
  // Return all address
  async getUserHasAddress(req, res, next) {
    const id = req.params.id;
    const results = await dataMapper.userHasAddress(id);

    if (!results || results.length === 0) {
      const err = new APIError(`Can not find address for user with id : ${id}`,400);
      return next(err);
    }

    res.status(200).json(results);
  },
  // Return all sports
  async getUsersport(req, res, next) {
    const id = req.params.id;
    const results = await dataMapper.userHasSport(id);

    if (!results || results.length === 0) {
      const err = new APIError(`Can not find sport for user with id : ${id}`,400);
      return next(err);
    }

    res.status(200).json(results);
  },
  // Return all events
  async getUserHasEvents(req, res, next) {
    const id = req.params.id;
    const results = await dataMapper.userHasEvents(id);

    if (!results || results.length === 0) {
      const err = new APIError(`Can not find events for user with id : ${id}`,400);
      return next(err);
    }

    res.status(200).json(results);
  },
  // Add sport for user
  async createUserHasSport(req, res, next) {
    const id = req.params.id;
    const sportId = req.params.sportid;

    // Return all sports
    const listSport = await dataMapper.userHasSport(id);
    let err = '';
    // We check if user already have this psort
    if(listSport) {
      listSport.forEach(obj => {
        if(obj.sport_id === sportId) {
          return err = new APIError(`This sport is already added`, 400);
        }
      });
    };
    // If we already have this sport we send an error
    if (err) {
      return next(err)
    } else {
      const results = await dataMapper.userCreateHasSport(id, sportId);
      if (!results) {
          const err = new APIError(`Can not add sport`, 400);
          return next(err);
      };

      res.status(200).json(`Sport with id : ${sportId} has been added to user with id : ${id}`);
    };
  },
  // Delete user address
  async deleteAddress(req, res, next) {
    const id = req.params.id;
    const addressId = req.params.addressid;
    const results = await dataMapper.userDeleteAddress(id, addressId);
    if (results !== 1) {
      const err = new APIError(`Can not delete Address`, 400);
      return next(err);
    }

    res.status(200).json(`Address with id : ${addressId} has been deleted`);
  },
  // Delete user sport
  async deleteSport(req, res, next) {
    const id = req.params.id;
    const sportId = req.params.sportid;

    const results = await dataMapper.userDeleteSport(id, sportId);
    if (results !== 1) {
      const err = new APIError(`Can not delete Sport`, 400);
      return next(err);
    }

    res.status(200).json(`Sport with id : ${sportId} has been deleted`);
  },
};

module.exports = userController;
