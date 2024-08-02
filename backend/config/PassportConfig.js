import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { findUserByUsername } from "../db/UserQueries.js";

function initialize(passport) {
	console.log("Initialized");

	const authenticateUser = async (username, password, done) => {
		try {
			const user = await findUserByUsername(username);

			if (!user) {
				return done(null, false, {
					message: "No user with that username",
				});
			}

			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) {
					console.log(err);
				}
				if (isMatch) {
					return done(null, user);
				} else {
					//password is incorrect
					return done(null, false, { message: "Password is incorrect" });
				}
			});
		} catch (error) {
			throw error;
		}
	};

	// Define the local strategy for Passport
	passport.use(
		new LocalStrategy(
			{ usernameField: "username", passwordField: "password" },
			authenticateUser
		)
	);
}

export default initialize;
