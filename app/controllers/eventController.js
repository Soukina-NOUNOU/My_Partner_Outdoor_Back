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

  // Return list of random events
  async getRandom (req, res, next) {
    const results = await dataMapper.eventFindRandom();
    
    // If no data in DB
    if(results.length === 0) {
      const err = new APIError(`Can not find events`, 400);
      return next(err);
  };

  res.status(200).json(results); 
  },
  // Return search events
  async getSearch (req, res, next) {
    const { dept, search } = req.query;
    const results = await dataMapper.eventFindSearch(search);
    
    // If not results
    if(results.length === 0) {
      const err = new APIError(`Can not find events with this search`, 400);
      return next(err);
    };

    // Return all results
    if(!dept) {
      res.status(200).json(results);
    } else {
      // Return results filter by Departement
      const resultsWithDept = [];
      results.forEach(obj => {
        if(obj.zip_code.slice(0,2) === dept.slice(0,2)) {
          resultsWithDept.push(obj);
        }
      });
  
      res.status(200).json(resultsWithDept);
    }
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