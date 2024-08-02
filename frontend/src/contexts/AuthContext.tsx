import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	currentUser: any;
	token: string;
	userRole: string;
	signIn: (jwtToken: string, user: any, role: string) => void;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useState("");
	const [userRole, setUserRole] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Rehydration: Load the token and userRole from localStorage when the component mounts
		const storedToken = localStorage.getItem("token");
		const storedRole = localStorage.getItem("userRole");
		if (storedToken) {
			setToken(storedToken);
		}
		if (storedRole) {
			setUserRole(storedRole);
		}
		setLoading(false);
	}, []);

	// Function to sign in the user, set the token, and store the role
	const signIn = (jwtToken: string, user: any, role: string) => {
		setToken(jwtToken);
		setCurrentUser(user);
		setUserRole(role);
		// Store the token and role in localStorage
		localStorage.setItem("token", jwtToken);
		localStorage.setItem("userRole", role);
	};

	// Function to sign out the user
	const signOut = () => {
		setCurrentUser(null);
		setToken("");
		setUserRole("");
		// Remove the token and role from storage
		localStorage.removeItem("token");
		localStorage.removeItem("userRole"); // Also remove the role from localStorage
	};

	const value = {
		currentUser,
		token,
		userRole,
		signIn,
		signOut,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export default function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"useUserAuth must be used within a UserAuthContextProvider"
		);
	}
	return context;
}
