require('dotenv').config();

module.exports = {
	aws_access_key_id: `${process.env.AWS_ACCESS_KEY_ID}`,
	aws_secret_access_key: `${process.env.AWS_SECRET_ACCESS_KEY}`,
	aws_bucket_name: `${process.env.AWS_BUCKET_NAME}`,
};
