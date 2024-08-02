import React, { useEffect, useState } from "react";
import { usersService } from "../../services/UsersService";
import { jwtDecode } from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AccountSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [hidePasswordSection, setHidePasswordSection] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.userId;
          const response = await usersService.getUser(userId);

          if (response.success) {
            setUsername(response.user.username);
            setEmail(response.user.email);
            setRole(response.user.role);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleOpenUsernameModal = () => {
    setShowUsernameModal(true);
  };

  const handleCloseUsernameModal = () => {
    setShowUsernameModal(false);
  };

  const handleOpenEmailModal = () => {
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      await usersService.changePassword(userId, currentPassword, newPassword);
      alert("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowModal(false);
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }
      const decoded = jwtDecode(token);
      const id = decoded.userId;

      if (!id) {
        console.error("User ID not found in token");
        return;
      }

      await usersService.updateUser(id, username, email, role);
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  const togglePasswordSection = () => {
    setHidePasswordSection(!hidePasswordSection);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-6">
      <div className="w-full min-h-screen max-w-8xl p-8 space-y-10 rounded-lg bg-white shadow-lg font-inter">
        <h2 className="text-left text-2xl font-bold text-gray-900">
          Account Settings
        </h2>
        <br />
        <form className="space-y-4">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h5 className="text-left text-xl font-bold text-gray-900">
                Username
              </h5>
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={handleOpenUsernameModal}
                style={{ textDecoration: "underline" }}
              >
                Change
              </span>
            </div>
            <br />
            <p>
              Your username is{" "}
              <span style={{ fontWeight: "bold" }}>{username}</span>
            </p>
            <div className="border-b border-gray-300 my-4"></div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h5 className="text-left text-xl font-bold text-gray-900">
                Email address
              </h5>
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={handleOpenEmailModal}
                style={{ textDecoration: "underline" }}
              >
                Change
              </span>
            </div>
            <br />
            <p>
              Your email address is{" "}
              <span style={{ fontWeight: "bold" }}>{email}</span>
            </p>
            <div className="border-b border-gray-300 my-4"></div>
          </div>
          <div>
            <h5 className="text-left text-xl font-bold text-gray-900">Role</h5>
            <br />
            <p>
              Your account role is{" "}
              <span style={{ fontWeight: "bold" }}>{role}</span>
            </p>
            <div className="border-b border-gray-300 my-4"></div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h5 className="text-left text-xl font-bold text-gray-900">
                Password
              </h5>
              <span
                className="text-blue-500 cursor-pointer underline"
                onClick={togglePasswordSection}
                style={{ textDecoration: "underline" }}
              >
                {hidePasswordSection ? "Show" : "Hide"}
              </span>
            </div>
            <br />
            {!hidePasswordSection && (
              <div className="flex flex-wrap">
                <div className="mb-4 w-full sm:w-30">
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-normal text-black-700"
                  >
                    <strong>Current Password:</strong>
                  </label>
                  <input
                    type={"password"}
                    id="currentPassword"
                    className="mt-1 block w-30 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap">
                  <div className="mr-4">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-normal text-black-700"
                    >
                      <strong> New Password:</strong>
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        className="mt-1 block w-30 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center mr-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {!showNewPassword ? (
                          <FiEyeOff className="h-5 w-5 text-gray-700" />
                        ) : (
                          <FiEye className="h-5 w-5 text-gray-700" />
                        )}
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="mr-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-normal text-black-700"
                    >
                      <strong>Confirm New Password:</strong>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="mt-1 block w-30 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            {!hidePasswordSection && (
              <button
                type="button"
                onClick={handleChangePassword}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ marginTop: "16px" }}
              >
                Save Password
              </button>
            )}
            <div className="border-b border-gray-300 my-4"></div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Account Changes
            </button>
          </div>
          {showUsernameModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center lg:mr-[-250px]">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="z-20 bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Change Username</h3>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseUsernameModal}
                    className="mr-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseUsernameModal}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}
          {showEmailModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center lg:mr-[-250px]">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="z-20 bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">
                    Change Email Address
                  </h3>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseEmailModal}
                    className="mr-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseEmailModal}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
