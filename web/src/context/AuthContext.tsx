import { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the context
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the AuthContext with undefined as the default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the type for the props of the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  const login = (token: string) => {
    localStorage.setItem("token", `Bearer ${token}`);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  // Throw an error if the hook is used outside the provider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
