"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import logo from "../assets/logo.svg"
import userprofileicon from "../assets/userprofileicon.svg"
import "./Navbar.css"


const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo || "/placeholder.svg"} alt="Quiver" />
          <span>Quiver</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/escorts">Escorts</Link>
          </li>
        
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Become an escort</Link>
          </li>
        </ul>

        <div className="navbar-auth">
          {user ? (
            <>
             
              <Link to="/Profile" className="profile-link">
                <img 
                  src={userprofileicon || "/placeholder.svg"}
                  alt="User Profile"
                  className="profile-icon"
                />
              </Link>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar
