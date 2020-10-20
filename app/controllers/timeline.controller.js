const db = require('../models');

const Timeline = db.timeline;

// Create and Save a new Timeline
exports.create = (req, res) => {
	// Validate Request
	if (!req.body.title) {
		res.status(400).send({ message: 'Content cannot be empty!' });
		return;
	}

	// Create Timeline Object to be saved
	const timeline = new Timeline({
		title: req.body.title,
		description: req.body.description,
		content: req.body.content,
		published: false,
	});

	timeline
		.save(timeline)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Timeline.',
			});
		});
};

// Find all Timelines from the database
exports.findAll = (req, res) => {};

// Find a single Timeline with an ID
exports.findOne = (req, res) => {};

// Update a Timeline by the ID in the request
exports.update = (req, res) => {};

// Delete a Timeline with the specified ID in the request
exports.delete = (req, res) => {};

// Delete all Timelines from the database
exports.deleteAll = (req, res) => {};

// Find all published Timelines
exports.findAllPublished = (req, res) => {};
