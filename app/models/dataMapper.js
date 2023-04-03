const client = require ('../utils/dbConnect');

const dataMapper = {
/******************* user **********************/  

  // View a user profil
  async userFindByPk(id) {
    const query = `SELECT * FROM "user" WHERE "id"=$1`;
    const results = await client.query(query, [id]);
    return results.rows[0];
  },

  // create a user profil
  async userCreate(user) {;
    const query = `INSERT INTO "user" 
      (firstname, lastname, email, password, pseudo, picture, birthday, bio)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`;
    const values = [user.firstname, user.lastname, user.email, user.password, user.pseudo, user.picture, user.birthday, user.bio];
    const results = await client.query(query, values);
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

    return result.rows[0];
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
    event.equipement,
    event.price,
    event.picture,
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
  
  return result.rows;
}
    

/********************* Event ********************/

  // modify a user profil
  async userModify(id, user) {
    const query = `UPDATE "user" 
      SET firstname=$1, lastname=$2, email=$3, password=$4, pseudo=$5, picture=$6, birthday=$7, bio=$8, updated_at=NOW() 
      WHERE id=$9 
      RETURNING *`;
    const values = [user.firstname, user.lastname, user.email, user.password, user.pseudo, user.picture, user.birthday, user.bio, id];
    const results = await client.query(query, values);
    return results.rows[0];
  },

  // delete user profil
  async userDelete(id) {
    const query = `DELETE FROM "user" WHERE "id"=$1`;
    const results = await client.query(query, [id]);
    return results;
  },
  
/********************* end user ***********************/


};

module.exports = dataMapper;