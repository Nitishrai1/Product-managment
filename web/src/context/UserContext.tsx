import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";


interface UserData {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
}


interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);



export const UserProvider = ({ children }) => {
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
      const response = await axios.get(`${apiUrl}/api/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Sending token in the headers if needed
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

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
