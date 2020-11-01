const db = require('../models');

const Timeline = db.timeline;

// TODO:
// - Add content to new Timelines
exports.create = (req, res) => {
	// Validate Request
	if (!req.body.title || !req.body.description) {
		return res.status(400).send({ message: 'Content cannot be empty!' });
	}

	// Create Timeline Object to be saved
	const timeline = new Timeline({
		title: req.body.title,
		description: req.body.description,
		ownerId: req.body.ownerId,
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

// Upload an image to S3
exports.imageUpload = (req, res) => {
	try {
		if (!req.file) {
			throw new Error('Image is not presented!');
		}

		return res.json({ message: 'Image recieved and uploaded!' });
	} catch (error) {
		return res.status(422).send({ message: error.message });
	}
};

// Find all Timelines from the database
exports.findAll = (req, res) => {
	const title = req.query.title;

	// Create a condition to search by or just return all the timelines
	var condition = title
		? { title: { $regex: new RegExp(title), $options: 'i' } }
		: {};

	Timeline.find(condition)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occured while retrieving Timelines.',
			});
		});
};

exports.findByUserId = (req, res) => {
	const userId = req.params.userId;

	Timeline.find({ ownerId: userId })
		.then((data) => {
			!data
				? res
						.status(404)
						.send({ message: 'Could not find any Timelines for user Id = ' + userId })
				: res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error retrieving Timlines for user Id = ' + userId,
			});
		});
};

// Find a single Timeline with an ID
exports.findOne = (req, res) => {
	const id = req.params.id;

	Timeline.findById(id)
		.then((data) => {
			!data
				? res.status(404).send({ message: 'Not found Timeline with id ' + id })
				: res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error retrieving Timeline with id = ' + id,
			});
		});
};

exports.findByTitle = (req, res) => {
	const title = req.params.title;

	Timeline.find({ title: title })
		.then((data) => {
			!data
				? res.status(404).send({
						message: 'No Timeline with the title ' + title + ' could be found.',
				  })
				: res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Error retrieving Timeline with title = ' + title,
			});
		});
};

// Update a Timeline by the ID in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Data to update cannot be empty!',
		});
	}

	const id = req.params.id;

	Timeline.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			!data
				? res.status(404).send({
						message: `Cannot update Timeline with id=${id}. Maybe the Timeline was not found!`,
				  })
				: res.send({ message: 'Timeline was updated successfully.' });
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Timeline with id=' + id,
			});
		});
};

// Delete a Timeline with the specified ID in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Timeline.findByIdAndDelete(id)
		.then((data) => {
			!data
				? res.status(404).send({
						message: `Cannot delete Timeline with id=${id}. Maybe Timeline was not found!`,
				  })
				: res.send({ message: 'Timeline was deleted successfully.' });
		})
		.catch((err) => {
			res.send(500).send({
				message: 'Could not delete the Timeline with id=' + id,
			});
		});
};

// Find all published Timelines
exports.findAllPublished = (req, res) => {
	Timeline.find({ published: true })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving Timelines.',
			});
		});
};
