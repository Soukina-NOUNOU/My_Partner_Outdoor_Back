const client = require ('../utils/dbConnect');

const dataMapper = {
 /********************* Profil *******************/ 
  async userFindByPk(id) {
  const query = `SELECT * FROM "user" WHERE "id"=$1`;
  const results = await client.query(query, [id]);
    return results.rows[0];
  },
/********************* Profil *******************/ 

/********************* Event ********************/
  async eventFindByPk(id) {
  const query = `SELECT * FROM "event" WHERE "id"=$1`;
  const results = await client.query(query, [id]);
    return results.rows[0];
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
    event.organizer_id,
    event.sport_id,
    event.level_id,
    event.address_id,
    id,
  ];
   console.log(values);

  const result = await client.query(query, values);
 
  return result.rows[0];
},

async eventDelete(id) {
  const query = `DELETE FROM "event" WHERE id = $1`;
  const values = [id];
  const result = await client.query(query, values);
  
  return result.rowCount;
}
    

/********************* Event ********************/
};

module.exports = dataMapper;