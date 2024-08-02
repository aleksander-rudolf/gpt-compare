import jwt from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      // Add the user to the request object
      req.user = user;
      next(); // Proceed to the next middleware/function
    });
  } else {
    // If no token is provided, return an unauthorized status
    res.sendStatus(401); // Unauthorized
  }
};
