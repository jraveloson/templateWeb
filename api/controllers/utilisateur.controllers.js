const { v4: uuidv4 } = require("uuid");


const db = require("../models");
const Utilisateurs = db.utilisateur;
const Op = db.Sequelize.Op;

exports.getAll = (req, res) => {

  Utilisateurs.findAll()
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });
};

exports.create = async (req, res) => {
  const {
    nom,
    prenom,
    login,
    pass
  } = req.body;

  // Validation des champs
  if (!nom) return res.status(400).json({ message: "Le champ 'nom' est obligatoire." });
  if (!prenom) return res.status(400).json({ message: "Le champ 'prenom' est obligatoire." });
  if (!login) return res.status(400).json({ message: "Le champ 'login' est obligatoire." });
  if (!pass) return res.status(400).json({ message: "Le champ 'pass' est obligatoire." });

  const utilisateur = { nom, prenom, login, pass };

  Utilisateurs.create(utilisateur)
    .then(data => {
      res.status(201).send({
        message: "Utilisateur créé avec succès.",
        utilisateur: data
      });
    })
    .catch(err => {
      console.error("Erreur lors de la création de l'utilisateur : ", err);
      res.status(500).send({ message: err.message });
    });
};

