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
  async userCreate(user) {
    const query = `INSERT INTO "user" 
      (firstname, lastname, email, password, pseudo, picture, birthday, bio)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
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
    return results;
  },
  /******************* End User ******************/

  /******************* Event *********************/
  // Select one event
  async eventFindByPk(id) {
    const query = `SELECT * FROM "event" WHERE "id"=$1`;
    const results = await client.query(query, [id]);
    return results.rows[0];
  },
  // Create one event
  async eventCreate(event) {
    const query = `INSERT INTO "event"(title, description, start, finish, nb_participant, equipement, price, picture, organizer_id, sport_id, level_id, address_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
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
        organizer_id = $6,
        sport_id = $7,
        level_id = $8,
        address_id = $9
      WHERE id = $10
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
    return results.rows;
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
  SELECT * FROM "sport"
  JOIN "event" ON event.sport_id = sport.id
  JOIN "address" ON event.address_id = address.id
  WHERE LOWER(name) LIKE LOWER($1)
  `;
    search = `%${search}%`;
    const results = await client.query(query, [search]);
    return results.rows;
  },
  /******************* End Event *****************/
};

module.exports = dataMapper;
