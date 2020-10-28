const admin = require('firebase-admin');
// Load Firebase admin credentials
const serviceAccount = require('C:/Users/Johny/Desktop/overlook-backend/static/overlook-23fbe-firebase-adminsdk-ogfh3-a7cff501d4.json');
// Load .env file
require('dotenv').config();

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIREBASE_DATABASE_URL,
});

module.exports = async (res, req, next) => {
	if (
		req.req.headers.authorization &&
		req.req.headers.authorization.startsWith('Bearer ')
	) {
		idToken = req.req.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token found');
		return res.res
			.status(401)
			.json({ error: 'Unauthorized - No Token Provided' });
	}

	try {
		await admin
			.auth()
			.verifyIdToken(idToken)
			.then((decodedToken) => {
				req.req.user = decodedToken;
			});
	} catch (error) {
		return res.res.status(401).json({ error });
	}

	next();
};
