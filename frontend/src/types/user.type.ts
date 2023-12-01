export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "owner" | "veterinarian";
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};
