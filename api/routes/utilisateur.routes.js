

module.exports = app => {
  const utilisateur = require("../controllers/utilisateur.controllers.js");

  var router = require("express").Router();

  router.post("/", utilisateur.create);
  router.get("/", utilisateur.getAll);


  app.use('/api/utilisateur', router);
};
