"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import "./Dashboard.css"

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>You have been successfully signed in, BICHE {user.name}!</h1>
          <p>Manage your trips and connect with guides</p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2>Your Profile</h2>
            <div className="profile-info">
              <div className="profile-field">
                <span className="field-label">Name:</span>
                <span className="field-value">{user.name}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Email:</span>
                <span className="field-value">{user.email}</span>
              </div>
              <div className="profile-field">
                <span className="field-label">Member Since:</span>
                <span className="field-value">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <button className="btn btn-outline">Edit Profile</button>
          </div>

          <div className="dashboard-card">
            <h2>Upcoming Trips</h2>
            <div className="empty-state">
              <p>You don't have any upcoming trips yet.</p>
              <button className="btn btn-primary">Plan a Trip</button>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Saved Destinations</h2>
            <div className="empty-state">
              <p>You haven't saved any destinations yet.</p>
              <button className="btn btn-primary">Explore Destinations</button>
            </div>
          </div>

     
        </div>
      </div>
    </div>
  )
}

export default Dashboard
