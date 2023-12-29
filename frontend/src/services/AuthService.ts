import axios, { AxiosResponse } from "axios";
import { User, AuthResponse, LoginCredentials } from "../types/user";
import { Pet } from "../types/pet";

const baseURL = "http://localhost:8080/auth";

const AuthService = {
  register: async (user: User) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${baseURL}/register`,
        user
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  registerPet: async (userId: string, petDetails: Pet) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${baseURL}/register-pet/${userId}`,
        petDetails
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  login: async (
    credentials: LoginCredentials,
    setAuthenticated: (value: boolean) => void
  ) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${baseURL}/login`,
        credentials
      );
      const { token, isAuthenticated } = response.data;
      localStorage.setItem("token", token);
      setAuthenticated(isAuthenticated);
      console.log("Login successful. Response:", response.data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  logout: async (token: string, setAuthenticated: (value: boolean) => void) => {
    try {
      await axios.get(`${baseURL}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuthenticated(false);
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};

export default AuthService;
