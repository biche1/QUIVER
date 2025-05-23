import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// const BASE_API_URL = "https://quiver-api.onrender.com/api/v1"; 
const BASE_API_URL = "http://localhost:5000/api/v1"; // Local development URL

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//Transform backend data to frontend structure
  const transformUserData = (apiData) => {
    if (!apiData) return null;
    const p = apiData;
    return {
     id: p.id,
      age: p.aga,
      fullName: p.profile.fullName,
      bio: p.profile.bio,
      dateOfBirth: p.profile.dateOfBirth,
      gender: p.profile.gender,
      imageUrl: p.profile.imageUrl || "https://via.placeholder.com/150",
      role: p.role,
      createdAt: p.createdAt,
      preferences: p.preferences,
      location: p.location,
      escortProfile: p.escortProfile ? p.escortProfile : null,
      // Add any other necessary transformations
    }};

  // Fetch user profile from backend
  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const authUser = localStorage.getItem("user");
      if (!authUser) {
        setError("Please log in to access this page. Redirecting to login...");
        setLoading(false);
        /// redirect to login page
        return;
      }

      const { token } = JSON.parse(authUser);
      const response = await axios.get(`${BASE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = transformUserData(response.data.data.data);
      userData ? setUser(userData) : setError("No user data found");
      setLoading(false);
    //   return userData;
    } catch (err) {
        console.log(err)
        if(err.status) {
            console.log(err)
            setError(err.response?.data?.message || "Failed to fetch user data");
        }
      setUser(null);
      setLoading(false);
    }
  };


  //handle API errors consistently
    const handleApiError = (err) => {
    const errorMessage = err.response?.data?.message || 
                       err.message || 
                       'Failed to fetch user data';
    setError(errorMessage);
    setUser(null);
    setLoading(false);

    // Handle unauthorized errors by clearing token
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    return fetchUserProfile();
  };

  // Update user data after mutations
  const updateUserData = (newData) => {
    setUser(prev => ({
      ...prev,
      ...newData
    }));
  };

  //initialize user data 
    useEffect(() => {
        fetchUserProfile();
    // Optionally, add a refresh interval here if needed
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        fetchUserProfile,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}