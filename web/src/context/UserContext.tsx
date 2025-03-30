import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

// Define the structure of the user data
interface UserData {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
}

// Define the structure of the UserContext
interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const apiUrl = import.meta.env.VITE_BACKEND_URL; // Ensure apiUrl is defined correctly

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { token } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
  });

  const fetchUserData = async () => {
    try {
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get(`${apiUrl}/api/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = response.data;
      if (data) {
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          middleName: data.middleName || "",
          email: data.email || "",
          password: data.password || "", 
        });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
