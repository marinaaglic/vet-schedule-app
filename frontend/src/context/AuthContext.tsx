import { ReactNode, createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setAuthenticated: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const isValid = await AuthService.validateToken(token);
        setIsAuthenticated(isValid);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, []);

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
