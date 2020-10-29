module.exports = (app) => {
	// Import the timeline controller - giving us access to all the functions
	const timelines = require('../controllers/timeline.controller');
	const FBAuth = require('../../middleware/auth');

	var router = require('express').Router();

	// Find all published Timelines
	router.get('/published', [FBAuth], timelines.findAllPublished);

	// Create a new Timeline
	router.post('/', [FBAuth], timelines.create);

	// Find All timlines in the DB
	router.get('/', [FBAuth], timelines.findAll);

	// Find All Timelines with User ID
	router.get('/:userId', [FBAuth], timelines.findByUserId);

	// Find a single Timeline with the ID defined
	router.get('/:id', [FBAuth], timelines.findOne);

	//Find a Timelines by Title
	router.get('/:title', [FBAuth], timelines.findByTitle);

	// Update a specific Timeline with a given ID
	router.put('/:id', [FBAuth], timelines.update);

	// Delete a specific Timeline with a given ID
	router.delete('/:id', [FBAuth], timelines.delete);

	app.use('/api/timelines', router);
};
