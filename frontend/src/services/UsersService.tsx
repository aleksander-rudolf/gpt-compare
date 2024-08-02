/* eslint-disable no-useless-catch */
import authAxios from "../utilities/AuthAxios";

class UsersService {
  async signIn(username: string, password: string) {
    try {
      const response = await authAxios.post("/users/user-login", {
        username,
        password,
      });
      // The response should contain the token and role upon successful login
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        role: response.data.role,
        message: response.data.message,
      };
    } catch (error) {
      throw error;
    }
  }

  async signUp(
    username: string,
    password: string,
    email: string,
    role: string
  ) {
    try {
      const response = await authAxios.post("/users/create-user", {
        username,
        password,
        email,
        role,
      });
      // The response should contain the user object upon successful signup
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUser(id: string) {
    try {
      const response = await authAxios.get(`/users/get-user/${id}`);
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const response = await authAxios.get(`/users/get-all-users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, username: string, email: string, role: string) {
    try {
      const response = await authAxios.put(`/users/user-update/`, {
        id,
        username,
        email,
        role,
      });
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUserRole(id: string, role: string) {
    try {
      const response = await authAxios.put(`/users/update-role/${id}`, {
        role,
      });
      return {
        success: true,
        user: response.data,
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    try {
      const response = await authAxios.put("/users/change-password", {
        userId,
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await authAxios.delete(`/users/delete-user/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const usersService = new UsersService();
