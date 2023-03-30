const dataMapper = require ('../models/dataMapper');

const profilController = {
  async getOne (req, res) {
    const id = Number(req.params.id);
    const results = await dataMapper.findByPk(id);
    
    if(!results) {
      return res.status(404).json('Can not find user with id ' + id);
  };

  res.status(200).json(results); 
  },
  
};

module.exports = profilController;