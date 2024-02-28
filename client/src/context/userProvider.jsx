import { createContext, useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    email: "",
    _id: "",
    theme: "",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;

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
      if (!storedToken || !userId) {
        return; 
      }
      const themeResponse = await axios.get(`${baseUrl}/auth/${userId}/theme`, {
        headers: {
          Authorization: storedToken
        }
      });

      if (themeResponse.data.theme) {
        setUser(prevUser => {
          const updatedUser = { ...prevUser, theme: themeResponse.data.theme };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return updatedUser;
        });
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
    navigate('/login');
  };

  const updateName = async (userId, newName) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/${userId}/update-name`, { name: newName });
      setUser(prevUser => ({ ...prevUser, name: newName }));
      localStorage.setItem('user', JSON.stringify({ ...user, name: newName }));
      return response.data;
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const updateProfileImage = async (userId, selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('profile-image', selectedFile);
      const response = await axios.post(`${baseUrl}/auth/${userId}/update-profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(prevUser => ({ ...prevUser, photo: response.data.photo }));
      localStorage.setItem('user', JSON.stringify({ ...user, photo: response.data.photo }));
      return response.data;
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoggedIn, updateName, updateProfileImage }}>
      {children}
    </UserContext.Provider>
  );
}

