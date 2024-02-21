import { createContext, useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../utils/api.js"

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
    _id: "",
    theme: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      fetchTheme(parsedUser._id);
    }
  }, []); 

  const fetchTheme = async (userId) => {
    try {
      const storedToken = localStorage.getItem("jwt_token");
      const themeResponse = await axios.get(`${baseUrl}/auth/${userId}/theme`, {
        headers: {
          Authorization: storedToken
        }
      });

      if (themeResponse.data.theme) {
        setUser(prevUser => ({ ...prevUser, theme: themeResponse.data.theme }));
        localStorage.setItem('user', JSON.stringify({ ...user, theme: themeResponse.data.theme }));
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });
  
      console.log('Response data:', response.data);
  
      if (response.data.success) {
        const userData = {
          ...response.data.user,
          theme: response.data.theme,
        };
  
        localStorage.setItem('jwt_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
  
        setUser(userData);
        setIsLoggedIn(true);
        navigate('/');
      }
  
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user'); 
    setIsLoggedIn(false);
    setUser({ email: "", _id: "", theme: "" });
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
