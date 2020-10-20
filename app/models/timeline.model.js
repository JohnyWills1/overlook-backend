module.exports = (mongoose) => {
	const Timeline = mongoose.model(
		'timeline',
		mongoose.Schema(
			{
				title: String,
				description: String,
				content: String,
				published: Boolean,
			},
			{ timestamps: true }
		)
	);

	return Timeline;
};
