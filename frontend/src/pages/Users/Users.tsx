import { useEffect, useState } from "react";
import { usersService } from "../../services/UsersService";
import { TrashIcon } from "@heroicons/react/24/solid";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const fetchedUsers = await usersService.getAllUsers();
				setUsers(fetchedUsers);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	const handleRoleChange = async (userId: number, newRole: string) => {
		try {
			const updatedUser = await usersService.updateUserRole(
				userId.toString(),
				newRole
			);
			if (updatedUser.success) {
				setUsers(
					users.map((user) =>
						user.id === userId ? { ...user, role: newRole } : user
					)
				);
			} else {
				console.error("Error updating user role:", updatedUser.error);
			}
		} catch (error) {
			console.error("Error updating user role:", error);
		}
	};

	const handleDeleteUser = async (userId: number) => {
		try {
			await usersService.deleteUser(userId.toString());
			const updatedUsers = users.filter((user) => user.id !== userId);
			setUsers(updatedUsers);
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-6">
			<div className="w-full min-h-screen p-8 space-y-6 rounded-lg bg-white shadow-lg overflow-x-auto md:overflow-visible">
				<h2 className="text-left text-2xl font-bold text-gray-900">
					Users List
				</h2>
				<br />
				<table className="min-w-full leading-normal hidden md:table">
					<thead>
						<tr>
							<th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Username
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Email
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Account Type
							</th>
							<th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									{user.username}
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									{user.email}
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<select
										value={user.role}
										onChange={(e) => handleRoleChange(user.id, e.target.value)}
										className="p-1 border border-gray-300 rounded"
									>
										<option>admin</option>
										<option>user</option>
									</select>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<button
										onClick={() => handleDeleteUser(user.id)}
										disabled={user.username === "admin"}
										className={`flex items-center justify-center pl-7 ${
											user.username === "admin"
												? "text-gray-500 cursor-not-allowed"
												: "text-red-600 hover:text-red-800"
										}`}
									>
										<TrashIcon className="h-6 w-6" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Mobile View */}
				<div className="md:hidden">
					{users.map((user) => (
						<div
							key={user.id}
							className="bg-white p-4 rounded-lg shadow mb-4 space-y-2"
						>
							<div>
								<strong>Username:</strong> {user.username}
							</div>
							<div>
								<strong>Email:</strong> {user.email}
							</div>
							<div>
								<strong>Account Type: </strong>
								<select
									value={user.role}
									onChange={(e) => handleRoleChange(user.id, e.target.value)}
									className="p-1 border border-gray-300 rounded"
								>
									<option>Admin</option>
									<option>User</option>
								</select>
							</div>
							<div className="mt-2">
								<button
									onClick={() => handleDeleteUser(user.id)}
									disabled={user.username === "admin"}
									className={` items-center justify-center  ${
										user.username === "admin"
											? "text-gray-500 cursor-not-allowed"
											: "text-red-600 hover:text-red-800"
									}`}
								>
									<TrashIcon className="h-6 w-6 " />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Users;
