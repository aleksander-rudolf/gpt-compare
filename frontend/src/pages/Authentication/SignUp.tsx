import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { usersService } from "../../services/UsersService";
import useAuth from "../../contexts/AuthContext";

const SignUp = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		verifyPassword: "",
		email: "",
		role: "user", // Assuming a default role, update as necessary
	});
	const [error, setError] = useState(""); // Optional: Manage error state

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Check if passwords match
		if (formData.password !== formData.verifyPassword) {
			setError("Passwords do not match.");
			return;
		}

		try {
			const createUserResponse = await usersService.signUp(
				formData.username,
				formData.password,
				formData.email,
				formData.role
			);
			const signInResponse = await usersService.signIn(
				formData.username,
				formData.password
			);

			if (createUserResponse.success && signInResponse.success) {
				signIn(signInResponse.token, signInResponse.user, signInResponse.role);
				navigate("/home");
			} else {
				setError("Failed to create an account.");
			}
		} catch (error) {
			console.error("Signup error:", error);
			setError("An error occurred during signup.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
			<div className="w-full max-w-xs p-8 space-y-6 rounded-lg bg-white shadow-md font-inter">
				<h1 className="text-center text-3xl font-bold text-gray-900 mb-4">
					GPT Compare
				</h1>
				<form className="space-y-6" onSubmit={handleSubmit}>
					<input
						type="text"
						name="username"
						placeholder="Username"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
						value={formData.username}
						onChange={handleChange}
					/>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Password"
							className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
							value={formData.password}
							onChange={handleChange}
						/>
						<div
							className="absolute inset-y-0 right-0 flex items-center mr-3"
							onClick={() => setShowPassword(!showPassword)}
						>
							{!showPassword ? (
								<FiEyeOff className="h-5 w-5 text-gray-700" />
							) : (
								<FiEye className="h-5 w-5 text-gray-700" />
							)}
						</div>
					</div>
					<input
						type="password"
						name="verifyPassword"
						placeholder="Verify Password"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
						value={formData.verifyPassword}
						onChange={handleChange}
					/>

					<input
						type="email"
						name="email"
						placeholder="Email account"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
						value={formData.email}
						onChange={handleChange}
					/>
					{error && <p className="text-red-500">{error}</p>}
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Create Account
					</button>
					<p className="text-center text-sm">
						Already have an account?
						<a href="/" className="text-blue-600 hover:underline">
							{" "}
							Sign In
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
