import axios, { AxiosResponse } from "axios";
import { User, AuthResponse, LoginCredentials } from "../types/user.type";
import { Pet } from "../types/pet.type";

const baseURL = "http://localhost:8080/auth";

const register = async (user: User) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${baseURL}/register`,
      user
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const registerPet = async (userId: string, petDetails: Pet) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${baseURL}/register-pet/${userId}`,
      petDetails
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const login = async (credentials: LoginCredentials) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${baseURL}/login}`,
      credentials
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const logout = async (token: string) => {
  try {
    await axios.get(`${baseURL}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export default { register, login, registerPet, logout };
