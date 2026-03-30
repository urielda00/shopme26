import jwt from 'jsonwebtoken';

export const checkJWT = async (req, res, next) => {
	// Support both cookies and Authorization header
	const token = req.cookies.session_token || req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ success: false, message: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
		req.user = decoded; // Attach user data to request object
		next();
	} catch (error) {
		return res.status(401).json({ success: false, message: 'Invalid or expired token' });
	}
};