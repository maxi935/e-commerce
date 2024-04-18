let db = require('../database/models')

const indexController = {
    index: (req, res) => {
    db.Cliente.findAll()
    .then(resultado=>{

      res.render("index", {resultado});

    })
  },
};
module.exports = indexController;
