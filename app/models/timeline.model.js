module.exports = (mongoose) => {
	const Timeline = mongoose.model(
		'timeline',
		mongoose.Schema(
			{
				title: {
					type: String,
					required: true,
				},
				description: String,
				content: [
					{
						image: String,
						comment: String,
					},
				],
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
