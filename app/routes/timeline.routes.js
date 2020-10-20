module.exports = (app) => {
	const timelines = require('../controllers/timeline.controller');

	var router = require('express').Router();

	// Create a new Timeline
	router.post('/', timelines.create);

	app.use('/api/timelines', router);
};
