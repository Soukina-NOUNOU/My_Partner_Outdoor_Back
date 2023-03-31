const client = require ('../utils/dbConnect');

const dataMapper = {
 /********************* Profil *******************/ 
  async profilFindByPk(id) {
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
    
/********************* Event ********************/
};

module.exports = dataMapper;