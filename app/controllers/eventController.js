const dataMapper = require ('../models/dataMapper');
const APIError = require('../middlewares/handlers/APIError');

const eventController = {
  // Return one Event
  async getOne (req, res, next) {
    const id = req.params.id;
    console.log(id);
    const results = await dataMapper.eventFindByPk(id);
    
    if(!results) {
      const err = new APIError(`Can not find event with id : ${id}`, 400);
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
    const eventId = results.id;
    const userId = results.organizer_id;
    const eventHasUser = await dataMapper.eventCreateHasUser(eventId, userId);
    if(!eventHasUser) {
      const err = new APIError(`Can not associate event_has_user`, 400);
      return next(err);
    };

    res.status(200).json(results); 
  },

  // Add user to Event
  async createEventAsUser (req, res, next) {
    const eventId = req.params.id;
    const userId = req.params.userid;

    // Return all users
    const listUser = await dataMapper.eventHasUser(eventId);
    let err = '';
    // We check if user already have this psort
    if(listUser) {
      listUser.forEach(obj => {
        if(obj.userid === userId) {
          return err = new APIError(`This user is already added`, 400);
        }
      });
    };
    // If we already have this sport we send an error
    if (err) {
      return next(err)
    } else {
      const results = await dataMapper.eventCreateHasUser(eventId, userId);
      if (!results) {
          const err = new APIError(`Can not add user`, 400);
          return next(err);
      };
      res.status(200).json(`User with id : ${userId} has been added to event with id : ${eventId}`);
    };
  },

  // Modify one Event
  async modify (req, res, next) {
    const id = req.params.id;
    const newEventData = req.body;

    // Compare old and new data
    const event = await dataMapper.eventFindByPk(id);
    const fields = ['title', 'description', 'start', 'finish', 'nb_participant', 'equipement', 'price', 'picture', 'number', 'street', 'zip_code', 'city', 'level', 'sport'];
    fields.forEach(field => {
      if (newEventData[field]) {
        event[field] = newEventData[field];
      }
    });

    // Update address
    // Check if we have some fields to update
    const fieldsAddress = ['number', 'street', 'zip_code', 'city'];
    let checkFields = 0;
    fieldsAddress.forEach(field => {
      if (newEventData[field]) {
        checkFields++;
      }
    });
    // If we have at least one field to change we update
    if (checkFields > 0) {
      const address = await dataMapper.addressModify(event);
      if (!address) {
        const err = new APIError(`Can not update address`, 400);
        return next(err);
      };
    };

    // If we need to update Sport, Return selected sport
    if (newEventData.sport) {
      const sport = await dataMapper.getSport(event);
      event.sport_id = sport.id
    };
    
    // If we need to update Level, Return selected level
    if (newEventData.level) {
      const level = await dataMapper.getLevel(event);
      event.level_id = level.id
    };
    
    // Update Event
    const results = await dataMapper.eventModify(id, event);
    if (!results) {
      const err = new APIError(`Can not update event`, 400);
      return next(err);
    };
    res.status(200).json(results);
  },
  // Delete one Event
  async delete(req, res, next){
    const id = req.params.id;
    const result = await dataMapper.eventDelete(id);
  
    if (result !== 1) {
      const err = new APIError(`Can not delete event with id ${id}`, 400);
      return next(err);
    }
  
    res.status(200).json(`Event with id : ${id} has been deleted`);
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
  // Return messages in one Event
  async getMessages (req, res, next){
    const eventId = req.params.id;
    const messages = req.body;
    const results = await dataMapper.eventFindAllMessages(eventId, messages);

    if (!results) {
      const err = new APIError(`Can not return messages`, 400);
      return next(err);
    }
    res.status(200).json(results);
  },
  // Create message in one Event
  async createMessage (req, res, next){
    const message = req.body;
    const id = req.params.id;
    const results = await dataMapper.createEventMessage(message, id);
    if (!results) {
      const err = new APIError(`Can not create message`, 400);
      return next(err);
    }
    res.status(200).json(`Message with id : ${results.id} has been added to event with id : ${id}`);
  },
  // Delete message in one event
  async deleteMessage (req, res, next){
    const id = req.params.id;
    const messageId = req.params.messageid;
    const results = await dataMapper.eventDeleteMessage(id, messageId);
    if (results !== 1) {
      const err = new APIError(`Can not delete message`, 400);
      return next(err);
    }
    res.status(200).json(`Message with id : ${messageId} has been deleted`);
  },
  // Delete User from Event
  async deleteUser (req, res, next) {
    const id = req.params.id;
    const userId = req.params.userid;
    const results = await dataMapper.eventDeleteUser(id, userId);
    if(results !== 1) {
      const err = new APIError(`Can not delete User`, 400);
      return next(err);
    };

    res.status(200).json(`User with id : ${userId} has been deleted`);
  },

};

module.exports = eventController;