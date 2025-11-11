const db = require("../models");
const Pollution = db.pollution;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {

	Pollution.findAll()
		.then(data => { res.send(data); })
		.catch(err => {
			res.status(400).send({
				message: err.message
			});
		});
};

exports.getById = (req, res) => {

	const id = req.params.id;

	Pollution.findByPk(id)
		.then(data => {
			if (!data) {
				return res.status(404).send({
					message: "Pollution not found"
				});
			}
			res.send(data);
		})
		.catch(err => {
			res.status(400).send({
				message: err.message
			});
		});
};

exports.create = async (req, res) => {
	const {
		titre,
		type_pollution,
		description,
		lieu,
		date_observation,
		latitude,
		longitude,
		photo_url
	} = req.body;

	// Validation des champs
	if (!titre) return res.status(400).json({ message: "Le champ 'titre' est obligatoire." });
	if (!type_pollution) return res.status(400).json({ message: "Le champ 'type' est obligatoire." });
	if (!description) return res.status(400).json({ message: "Le champ 'description' est obligatoire." });
	if (!lieu) return res.status(400).json({ message: "Le champ 'lieu' est obligatoire." });
	if (!date_observation) return res.status(400).json({ message: "Le champ 'date' est obligatoire." });
	if (latitude == null) return res.status(400).json({ message: "Le champ 'latitude' est obligatoire." });
	if (longitude == null) return res.status(400).json({ message: "Le champ 'longitude' est obligatoire." });

	const pollution = { titre, type_pollution, description, lieu, date_observation, latitude, longitude, photo_url };

	Pollution.create(pollution)
		.then(data => {
			res.status(201).send({
				message: "Pollution créée avec succès.",
				pollution: data
			});
		})
		.catch(err => {
			console.error("Erreur lors de la création de la pollution : ", err);
			res.status(500).send({ message: err.message });
		});
};


