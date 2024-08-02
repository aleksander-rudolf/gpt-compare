import jwt from "jsonwebtoken";

function generateJwtToken(userId, userRole) {
	const payload = {
		userId: userId,
		userRole: userRole,
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
}

export default generateJwtToken;
