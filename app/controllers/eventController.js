const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');

const eventController = {
  async getOne (req, res, next) {
    const id = Number(req.params.id);
    const results = await dataMapper.eventFindByPk(id);
    
    if(!results) {
      const err = new APIError(`Can not find user with id : ${id}`, 400);
      return next(err);
  };

  res.status(200).json(results); 
  },

  async create (req, res, next) {
    const events = req.body;
    const results = await dataMapper.eventCreate(events);
    
    if(!results) {
      const err = new APIError(`Can not insert event`, 400);
      return next(err);
  };

  res.status(200).json(results); 
  },

  async modify (req, res, next) {
  const id = req.params.id;
  const event = req.body;
  const result = await dataMapper.eventModify(id, event);

  console.log(event);
  if (!result) {
    const err = new APIError(`Can not update event`, 400);
    return next(err);
  }

  res.status(200).json(result);
  },
  

  async delete(req, res, next) {
    const id = req.params.id;
  
    const result = await dataMapper.eventDelete(id);
  
    if (!result) {
      const err = new APIError(`Can not delete event with id ${id}`, 400);
      return next(err);
    }
  
    res.status(200).json(result);
  }
  
};

module.exports = eventController;