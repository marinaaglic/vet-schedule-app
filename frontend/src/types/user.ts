import { Pet } from "./pet";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "owner" | "veterinarian";
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  userId: string;
  message: string;
  token: string;
  isAuthenticated: boolean;
};

export interface UserProfileProps {
  user: User;
  pets: Pet[];
}
