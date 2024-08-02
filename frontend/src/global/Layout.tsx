import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline"; // Ensure this is imported

export default function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Toggle the sidebar open state
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<div className="flex flex-1 overflow-hidden h-screen relative">
			<button
				onClick={toggleSidebar}
				className="p-4 lg:hidden z-30 absolute top-0 left-0"
			>
				<Bars3Icon className="h-6 w-6" />
			</button>

			<div
				className={`absolute z-20 inset-0 transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition duration-300 ease-in-out lg:relative lg:translate-x-0 lg:inset-auto lg:flex`}
			>
				<Sidebar />
			</div>

			<div className="flex flex-1 overflow-hidden">
				<main
					className={
						"flex-1 overflow-auto lg:mb-0 px-2 py-2 sm:px-12 sm:py-12 mt-14 lg:mt-0"
					}
				>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
