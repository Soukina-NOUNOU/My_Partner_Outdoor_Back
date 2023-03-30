const client = require ('../utils/dbConnect');

const dataMapper = {
  async findByPk(id) {
  const query = `SELECT * FROM "user" WHERE "id"=$1`;
  const results = await client.query(query, [id]);
    return results.rows[0];
  },

};

module.exports = dataMapper;