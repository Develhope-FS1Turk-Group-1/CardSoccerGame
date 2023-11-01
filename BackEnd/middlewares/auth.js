const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.JWT_KEY;

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader) {
		return res.status(401).json({
			message: 'No Token Available',
		});
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			message: 'No Token Available',
		});
	}

	jwt.verify(token, secretKey, (err, user) => {
		if (err) {
			return res.status(403).json({
				message: 'Invalid Token',
			});
		}
		req.user = user;
		next();
	});
};

module.exports = { authenticateToken };
