const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');

const eventController = {
  // Return one Event
  async getOne (req, res, next) {
    const id = req.params.id;
    const results = await dataMapper.eventFindByPk(id);
    
    if(!results) {
      const err = new APIError(`Can not find user with id : ${id}`, 400);
      return next(err);
  };
  res.status(200).json(results); 
  },
  // Create one Event
  async create (req, res, next) {
    const event = req.body;
    // Create address
    const address = await dataMapper.addressCreate(event);
    // Return selected sport
    const sport = await dataMapper.getSport(event);
    // Retunr selected level
    const level = await dataMapper.getLevel(event);
    // Create event
    const results = await dataMapper.eventCreate(event, address.id, sport.id, level.id);
    if(!results) {
      const err = new APIError(`Can not insert event`, 400);
      return next(err);
    };

    // Add organizer to event list user
    const eventHasUser = await dataMapper.eventCreateHasUser(results);
    if(!eventHasUser) {
      const err = new APIError(`Can not associate event_has_user`, 400);
      return next(err);
    };

    res.status(200).json(results); 
  },

  // Add user to event list
  async CreateEventAsUser (req, res, next) {
    const eventId = req.params.id;
    const userId = req.params.userid 
    const results = await dataMapper.eventCreateHasUser(eventId, userId);
    
    if (!results) {
      const err = new APIError(`Can not update event`, 400);
      return next(err);
    }
    res.status(200).json(results);
  },


  // Modify one Event
  async modify (req, res, next) {
  const id = req.params.id;
  const event = req.body;
  const result = await dataMapper.eventModify(id, event);

  if (!result) {
    const err = new APIError(`Can not update event`, 400);
    return next(err);
  }
  res.status(200).json(result);
  },
  // Delete one Event
  //TODO Check le retour avec rowCount
  async delete(req, res, next) {
    const id = req.params.id;
  
    const result = await dataMapper.eventDelete(id);
  
    if (!result) {
      const err = new APIError(`Can not delete event with id ${id}`, 400);
      return next(err);
    }
  
    res.status(200).json(result);
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
  // Return users in one Event
  async getEventUsers (req, res, next){
      const eventId = req.params.id;
      const results = await dataMapper.eventHasUser(eventId);
      
      if (!results) {
        const err = new APIError(`Can not update event`, 400);
        return next(err);
      }
      res.status(200).json(results);
    },
  
};

module.exports = eventController;