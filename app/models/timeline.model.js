const { Schema } = require('mongoose');

module.exports = (mongoose) => {
	const content = new Schema({
		comments: [
			{
				comment: String,
			},
		],
		image_url: {
			type: String,
		},
	});

	const Timeline = mongoose.model(
		'timeline',
		mongoose.Schema(
			{
				title: {
					type: String,
					required: true,
				},
				description: String,
				content: [content],
				published: Boolean,
				ownerId: {
					type: String,
					required: true,
				},
				contributorIds: [String],
			},
			{ timestamps: true }
		)
	);

	return Timeline;
};
