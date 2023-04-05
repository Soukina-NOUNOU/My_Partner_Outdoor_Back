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
  // Login one user
  async userLogin(email) {
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
  async userCreateHasSport(user, sport) {
    const query = `INSERT INTO "user_has_sport"(user_id, sport_id)
    VALUES ($1, $2)
    RETURNING *`;
    const values = [user.id, sport.id];
    const results = await client.query(query, values);
    return results.rows[0];
  },
  //User has address
  async userHasAddress(id) {
    const query = `SELECT * FROM user_has_address
    JOIN "address" ON user_has_address.address_id = "address".id
    WHERE "user_id"=$1`;
    const results = await client.query(query, [id]);
    return results.rows;
  },
  
  /******************* End User ******************/

  /******************* Event *********************/
  // Select one event
  async eventFindByPk(id) {
    // const query = `SELECT * FROM "event" WHERE "id"=$1`;
    const query = `
      SELECT *, level.name AS level, sport.name AS sport FROM "event"
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
    const query = `INSERT INTO "event"(title, description, start, finish, nb_participant, equipement, price, picture, organizer_id, sport_id, level_id, address_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`;
    const values = [
      event.title,
      event.description,
      event.start,
      event.finish,
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
        start = $3,
        finish = $4,
        nb_participant = $5,
        equipement = $6,
        price = $7,
        picture = $8,
        organizer_id = $9,
        sport_id = $10,
        level_id = $11,
        address_id = $12
      WHERE id = $13
      RETURNING *;
    `;
    const values = [
      event.title,
      event.description,
      event.start,
      event.finish,
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
    const query = `SELECT * FROM "event" ORDER BY RANDOM () LIMIT 3`;
    const results = await client.query(query);
    return results.rows;
  },
  // Select events by search
  async eventFindSearch(search) {
    const query = `
    SELECT *, level.name AS level, sport.name AS sport FROM "event"
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
  // Get users in Event
  async eventHasUser (eventId) {
    const query = `SELECT * FROM event_has_user
    JOIN "user" ON event_has_user.user_id = "user".id
    WHERE event_id = $1
    ORDER BY pseudo ASC`;
    const results = await client.query(query, [eventId]);
    return results.rows;
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
  async getSport(obj) {
    const query = `SELECT * FROM "sport" WHERE "name"=$1`;
    const results = await client.query(query, [obj.sport]);
    return results.rows[0];
  },
  /******************* End Sport ****************/

  /******************* Level ********************/
  async getLevel(obj) {
    const query = `SELECT * FROM "level" WHERE "name"=$1`;
    const results = await client.query(query, [obj.level]);
    return results.rows[0];
  },
  /******************* End Level ****************/
};

module.exports = dataMapper;
