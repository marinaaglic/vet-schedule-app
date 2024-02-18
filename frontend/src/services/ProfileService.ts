import axios, { AxiosResponse } from "axios";
import { UserProfileProps } from "../types/user";

const baseURL = "http://localhost:8080/profile";

const ProfileService = {
  getUserInfo: async (): Promise<UserProfileProps> => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<UserProfileProps> = await axios.get(
        `${baseURL}/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};

export default ProfileService;
