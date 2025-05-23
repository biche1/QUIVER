"use client"

import { createContext, useState, useEffect } from "react"
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api/v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Create axios instance with default config
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      // Set authorization header if token exists
      const { token } = JSON.parse(storedUser)
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
    setLoading(false)
  }, [])

    const formmatUser = (response) => {
      const { user } = response.data.data;
      const { token } = response.data;

      return {user, token};
    }



  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })

      console.log(response);
      const { token } = response.data;
      const { user } = response.data.data;
      
      // Store user and token
      const userData = { ...user, token }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setLoading(false)
      return userData
    } catch (err) {
      console.log(err);
      let errorMessage = "Login failed"
      if (err.response.data?.message) {
          errorMessage = err.response.data.message
        }
       setError(errorMessage)
      setLoading(false)
      throw new Error(errorMessage)
    }

    // try {
    //   const response = await axios.post(`${API_URL}/auth/login`, {
    //     email,
    //     password
    //   },  {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     },
    //     withCredentials: true
    //   })

    //   const userData = response.data.user
    //   setUser(userData)
    //   localStorage.setItem("user", JSON.stringify(userData))
    //   setLoading(false)
    //   return userData
    // } catch (err) {
    //   console.log(err)
    //   let errorMessage = "Login failed"
    //   if (err.response) {
    //     errorMessage = err.response.data.message || errorMessage
    //   }
    //   setError(errorMessage)
    //   setLoading(false)
    //   throw new Error(errorMessage)
    // }
  }


  const signup = async (profile, email, password, passwordConfirm) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        profile,
        email,
        password,
        passwordConfirm
      });

       // Store user and token
      const userData = formmatUser(response);
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`

      setLoading(false)
      return userData

    } catch (err) {
      let errorMessage = "Signup failed"
      if (err.response) {
        errorMessage = err.response?.data?.message || errorMessage
      }
      setError(errorMessage)
      setLoading(false)
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    // Optional: You might want to call your backend logout endpoint here if you have one
    // await axios.post(`${API_URL}/auth/logout`)
  }
  
  const changePassword = async (oldPassword, newPassword, passwordConfirm) => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.patch('/auth/change-password', {
      oldPassword,
      password: newPassword,
      passwordConfirm
    });

    setLoading(false);
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to change password';
    setError(message);
    setLoading(false);
    throw new Error(message);
  }
};

const forgotPassword = async (email) => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.post('/auth/forgot-password', { email });
    setLoading(false);
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to send reset email';
    setError(message);
    setLoading(false);
    throw new Error(message);
  }
};

const resetPassword = async (resetToken, password, passwordConfirm) => {
  setLoading(true);
  setError(null);

  try {
    const response = await api.patch(`/auth/reset-password/${resetToken}`, {
      password,
      passwordConfirm
    });

    // i will log the user in automatically after reset
    const userData = formmatUser(response);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

    setLoading(false);
    return userData;
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to reset password';
    setError(message);
    setLoading(false);
    throw new Error(message);
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        changePassword,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


