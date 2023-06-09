const client = require("../utils/dbConnect");

const dataMapper = {
  /******************* User **********************/
  // Select one user
  async userFindByPk(id) {
    const query = `SELECT * FROM "user" WHERE "id"=$1`;
    const results = await client.query(query, [id]);
    return results.rows[0];
  },
  // Create one user
  async userCreate(user, password) {
    const query = `INSERT INTO "user" 
      (firstname, lastname, email, password, pseudo)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`;
    let values = [
      user.firstname,
      user.lastname,
      user.email,
      password,
      user.pseudo
    ];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  // Modify one user
  async userModify(id, user) {
    const query = `UPDATE "user" 
      SET firstname=$1, lastname=$2, email=$3, password=$4, pseudo=$5, picture=$6, birthday=$7, bio=$8, updated_at=NOW() 
      WHERE id=$9 
      RETURNING *`;
    const values = [
      user.firstname,
      user.lastname,
      user.email,
      user.password,
      user.pseudo,
      user.picture,
      user.birthday,
      user.bio,
      id,
    ];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  // Delete one user
  async userDelete(id) {
    const query = `DELETE FROM "user" WHERE "id"=$1`;
    const results = await client.query(query, [id]);
    return results.rowCount;
  },
  // Select one user by email
  async userFindByEmail(email) {
    const query = `SELECT * FROM "user"  WHERE "email"=$1`;
    const results = await client.query(query, [email]);
    return results.rows[0];
  },
  // Create association User Has Address
  async userCreateHasAddress(user, address) {
    const query = `INSERT INTO "user_has_address"(user_id, address_id)
    VALUES ($1, $2)
    RETURNING *`;
    const values = [user.id, address.id];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  // Create association User Has Sport
  async userCreateHasSport(userId, sportId) {
    const query = `INSERT INTO "user_has_sport"(user_id, sport_id)
    VALUES ($1, $2)
    RETURNING *`;
    const values = [userId, sportId];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  //Get all user adrress
  async userHasAddress(id) {
    const query = `SELECT * FROM user_has_address
    JOIN "address" ON user_has_address.address_id = "address".id
    WHERE "user_id"=$1`;
    const results = await client.query(query, [id]);
    return results.rows;
  },
  //Get all user events
  async userHasEvents(id) {
    const query = `
    SELECT event.id, event.title, event.description, event.start_date, event.finish_date, event.start_hour, event.finish_hour, event.nb_participant, event.equipement, event.price, event.picture, event.organizer_id, event.sport_id, event.level_id, event.address_id,
    address.number, address.street, address.zip_code, address.city, sport.name AS sport, level.name AS level
    FROM event_has_user
    JOIN "event" ON event_has_user.event_id = "event".id
    JOIN "address" ON event.address_id = address.id
    JOIN "sport" ON event.sport_id = sport.id
    JOIN "level" ON event.level_id = level.id
    WHERE "user_id"=$1
    `;
    const results = await client.query(query, [id]);
    return results.rows;
  },
  //Get all user Sport
  async userHasSport(id) {
    const query = `SELECT sport_id, "user_id", name
    FROM user_has_sport
    JOIN "sport" ON user_has_sport.sport_id = "sport".id
    WHERE "user_id"=$1`;
    const results = await client.query(query, [id]);
    return results.rows;
  },
  // Delete user address
  async userDeleteAddress(id, addressId) {
    const query = `DELETE FROM "user_has_address" WHERE "user_id"=$1 AND "address_id"=$2`;
    const results = await client.query(query, [id, addressId]);
    return results.rowCount;
  },
  // Delete user sport
  async userDeleteSport(id, sportId) {
    const query = `DELETE FROM "user_has_sport" WHERE "user_id"=$1 AND "sport_id"=$2`;
    const results = await client.query(query, [id, sportId]);
    return results.rowCount;
  },
  /******************* End User ******************/

  /******************* Event *********************/
  // Select one event
  async eventFindByPk(id) {
    // const query = `SELECT * FROM "event" WHERE "id"=$1`;
    const query = `
      SELECT event.id, event.title, event.description, event.start_date, event.finish_date, event.start_hour, event.finish_hour, event.nb_participant, event.equipement, event.price, event.picture, event.organizer_id, event.sport_id, event.level_id, event.address_id,
      address.number, address.street, address.zip_code, address.city, "user".pseudo, sport.name AS sport, level.name AS level 
      FROM "event"
      JOIN "sport" ON event.sport_id = sport.id
      JOIN "address" ON event.address_id = address.id
      JOIN "level" ON event.level_id = level.id
      JOIN "user" ON event.organizer_id = "user".id 
      WHERE event.id=$1
      `;
    const results = await client.query(query, [id]);
    return results.rows[0];
  },
  // Create one event
  async eventCreate(event, addressId, sportId, levelId) {
    const query = `INSERT INTO "event"(title, description, start_date, finish_date, start_hour, finish_hour, nb_participant, equipement, price, picture, organizer_id, sport_id, level_id, address_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *`;
    const values = [
      event.title,
      event.description,
      event.start_date,
      event.finish_date,
      event.start_hour,
      event.finish_hour,
      event.nb_participant,
      event.equipement,
      event.price,
      event.picture,
      event.organizer_id,
      sportId,
      levelId,
      addressId,
    ];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  // Modify one event
  async eventModify(id, event) {
    const query = `
      UPDATE "event" 
      SET title = $1,
        description = $2,
        start_date = $3,
        finish_date = $4,
        start_hour = $5,
        finish_hour = $6,
        nb_participant = $7,
        equipement = $8,
        price = $9,
        picture = $10,
        organizer_id = $11,
        sport_id = $12,
        level_id = $13,
        address_id = $14,
        updated_at=NOW()
      WHERE id = $15
      RETURNING *;
    `;
    const values = [
      event.title,
      event.description,
      event.start_date,
      event.finish_date,
      event.start_hour,
      event.finish_hour,
      event.nb_participant,
      event.equipement,
      event.price,
      event.picture,
      event.organizer_id,
      event.sport_id,
      event.level_id,
      event.address_id,
      id,
    ];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  // Delete one event
  async eventDelete(id) {
    const query = `DELETE FROM "event" WHERE id = $1`;
    const values = [id];
    const results = await client.query(query, values);
    return results.rowCount;
  },
  // Select random events
  async eventFindRandom() {
    const query = `
      SELECT event.id, event.title, event.description, event.start_date, event.finish_date, event.start_hour, event.finish_hour, event.nb_participant, event.equipement, event.price, event.picture, event.organizer_id, event.sport_id, event.level_id, event.address_id,
      address.number, address.street, address.zip_code, address.city, "user".pseudo, sport.name AS sport, level.name AS level 
      FROM "event"
      JOIN "sport" ON event.sport_id = sport.id
      JOIN "address" ON event.address_id = address.id
      JOIN "level" ON event.level_id = level.id
      JOIN "user" ON event.organizer_id = "user".id 
      ORDER BY RANDOM () LIMIT 12
      `;
    const results = await client.query(query);
    return results.rows;
  },
  // Select events by search
  async eventFindSearch(search) {
    const query = `
    SELECT event.id, event.title, event.description, event.start_date, event.finish_date, event.start_hour, event.finish_hour, event.nb_participant, event.equipement, event.price, event.picture, event.organizer_id, event.sport_id, event.level_id, event.address_id,
    address.number, address.street, address.zip_code, address.city, "user".pseudo, sport.name AS sport, level.name AS level 
    FROM "event"
    JOIN "sport" ON event.sport_id = sport.id
    JOIN "address" ON event.address_id = address.id
    JOIN "level" ON event.level_id = level.id
    JOIN "user" ON event.organizer_id = "user".id 
    WHERE LOWER(sport.name) LIKE LOWER($1)
    `;
    search = `%${search}%`;
    const results = await client.query(query, [search]);
    return results.rows;
  },
  // Create association Event Has User
  async eventCreateHasUser(eventId, userId) {
    const query = `INSERT INTO "event_has_user"(event_id, user_id)
    VALUES ($1, $2)
    RETURNING *`;
    const values = [eventId, userId];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  // Get all users in Event
  async eventHasUser (eventId) {
    const query = `SELECT "user".id AS userid, "user".firstname, "user".lastname, "user".email, "user".pseudo, "user".picture
    FROM event_has_user
    JOIN "user" ON event_has_user.user_id = "user".id
    WHERE event_id = $1
    ORDER BY pseudo ASC`;
    const results = await client.query(query, [eventId]);
    return results.rows;
  },
  // Get all messages in Event
  async eventFindAllMessages (messages) {
    const query = `SELECT event.id AS eventid, message.id AS messageid, message.user_id AS userid, message.content, message.created_at, "user".pseudo, "user".picture 
    FROM "event"
    JOIN "message" ON message.event_id = event.id
    JOIN "user" ON message.user_id = "user".id
    WHERE event.id=$1
    ORDER BY message.created_at DESC`;
    const results = await client.query(query, [messages]);
    return results.rows;
  },
  // Create message in Event
  async createEventMessage (message, id){
    const query = `INSERT INTO "message"(content, user_id, event_id)
    VALUES ($1, $2, $3)
    RETURNING *`;
    const values = [message.content, message.user_id, id];
    const results = await client.query(query, values)
    return results.rows[0];
  },
  // Delete message in Event
  async eventDeleteMessage (eventId, id){
    const query = `DELETE FROM "message" WHERE  "event_id" = $1 AND "id" = $2`;
    const values = [eventId, id];
    const results = await client.query(query, values);
    return results.rowCount;
  },
  // Delete user sport
  async eventDeleteUser(id, userId) {
    const query = `DELETE FROM "event_has_user" WHERE "event_id"=$1 AND "user_id"=$2`;
    const results = await client.query(query, [id, userId]);
    return results.rowCount;
  },

  /******************* End Event *****************/

  /******************* Address ******************/
  async addressCreate(address) {
    const query = `INSERT INTO "address" (number, street, zip_code, city)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;
    const values = [address.number, address.street, address.zip_code, address.city];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  async addressModify (address) {
    const query = `UPDATE "address" 
      SET number=$1, street=$2, zip_code=$3, city=$4, updated_at=NOW() 
      WHERE id=$5 
      RETURNING *`;
    const values = [address.number, address.street, address.zip_code, address.city, address.address_id];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  /******************* End Address **************/

  /******************* Sport ********************/
  async sportFindOne(obj) {
    const query = `SELECT * FROM "sport" WHERE "name"=$1`;
    const results = await client.query(query, [obj.sport]);
    return results.rows[0];
  },

  async sportFindAll() {
    const query = `SELECT * FROM "sport"`;
    const results = await client.query(query);
    return results.rows;
  },
  /******************* End Sport ****************/

  /******************* Level ********************/
  async levelFindOne(obj) {
    const query = `SELECT * FROM "level" WHERE "name"=$1`;
    const results = await client.query(query, [obj.level]);
    return results.rows[0];
  },
  async levelFindAll() {
    const query = `SELECT * FROM "level"`;
    const results = await client.query(query);
    return results.rows;
  },
  /******************* End Level ****************/
};

module.exports = dataMapper;
