// Load .env file
require('dotenv').config();

module.exports = {
	url: `mongodb+srv://dbUser:${process.env.DB_PASSWORD}@cluster0.37d05.mongodb.net/Overlook?retryWrites=true&w=majority`,
};
