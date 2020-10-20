module.exports = (app) => {
	// Import the timeline controller - giving us access to all the functions
	const timelines = require('../controllers/timeline.controller');

	var router = require('express').Router();

	// Find all published Timelines
	router.get('/published', timelines.findAllPublished);

	// Create a new Timeline
	router.post('/', timelines.create);

	// Find All timlines in the DB
	router.get('/', timelines.findAll);

	// Find a single Timeline with the ID defined
	router.get('/:id', timelines.findOne);

	// Update a specific Timeline with a given ID
	router.put('/:id', timelines.update);

	// Delete a specific Timeline with a given ID
	router.delete('/:id', timelines.delete);

	app.use('/api/timelines', router);
};
