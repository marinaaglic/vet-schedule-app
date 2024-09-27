import axios, { AxiosResponse } from "axios";
import { User, AuthResponse, LoginCredentials } from "../types/user";
import { Pet } from "../types/pet";

const baseURL = "http://localhost:8080/auth";

const AuthService = {
  register: async (user: User, setAuthenticated: (value: boolean) => void) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${baseURL}/register`,
        user
      );
      const { token, isAuthenticated } = response.data;
      localStorage.setItem("token", token);
      setAuthenticated(isAuthenticated);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  registerPet: async (userId: string, petDetails: Pet[]) => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        `${baseURL}/register-pet/${userId}`,
        { pets: petDetails }
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
      localStorage.removeItem("token");
      setAuthenticated(false);
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  validateToken: async (token: string) => {
    try {
      const response = await axios.post(
        "/api/auth/validate-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  },
};

export default AuthService;
