"use client"

import { createContext, useState, useEffect } from "react"
import { mockUsers } from "../data/mockData"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    setLoading(true)
    setError(null)

    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find((user) => user.email === email && user.password === password)

        if (foundUser) {
          // Remove password from user object before storing
          const { password, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))
          setLoading(false)
          resolve(userWithoutPassword)
        } else {
          setError("Invalid email or password")
          setLoading(false)
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  }

  const signup = (name, email, password) => {
    setLoading(true)
    setError(null)

    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = mockUsers.some((user) => user.email === email)

        if (userExists) {
          setError("User with this email already exists")
          setLoading(false)
          reject(new Error("User with this email already exists"))
        } else {
          // Create new user
          const newUser = {
            id: mockUsers.length + 1,
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
          }

          //still to be implemented
          // In a real app, i will send this to your API
          // For mock purposes, just pretend it was saved

          // Remove password from user object before storing
          const { password: pass, ...userWithoutPassword } = newUser
          setUser(userWithoutPassword)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))
          setLoading(false)
          resolve(userWithoutPassword)
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
