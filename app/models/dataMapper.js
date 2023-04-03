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