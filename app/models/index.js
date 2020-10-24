const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.timeline = require('./timeline.model')(mongoose);
db.image = require('./image.model')(mongoose);

module.exports = db;
