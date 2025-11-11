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

