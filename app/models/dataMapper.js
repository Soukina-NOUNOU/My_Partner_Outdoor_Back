const client = require ('../utils/dbConnect');

const dataMapper = {
  /***************** User *****************/
  async userFindByPk(id) {
  const query = `SELECT * FROM "user" WHERE "id"=$1`;
  const results = await client.query(query, [id]);
    return results.rows[0];
  },
  /******************************************/

  /***************** Event *****************/
  async eventFindByPk(id) {
    const query = `SELECT * FROM "event" WHERE "id"=$1`;
    const results = await client.query(query, [id]);
    return results.rows[0];
    },
  async eventFindRandom() {
    const query = `SELECT * FROM "event" ORDER BY RANDOM () LIMIT 3`;
    const results = await client.query(query);
    return results.rows;
  },
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
  
    const result = await client.query(query, values);
  
      return result;
  },
  /******************************************/
};

module.exports = dataMapper;