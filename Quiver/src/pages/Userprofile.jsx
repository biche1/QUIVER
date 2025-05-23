import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const { user, loading, error, fetchUserProfile, setUser } = useContext(UserContext);
    const [localError, setLocalError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
   const [editMode, setEditMode] = useState({
    general: false,
    security: false
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

    useEffect(() => {
    if (!loading && !user) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [loading, user, navigate]);

   useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line
  }, []);

   if (loading) return <div>Loading profile...</div>;
  if (error || localError) return <div className="error">{error || localError}</div>;
  if (!user) return <div>No user data available.</div>;

 

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });



  const saveGeneralInfo = async () => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
      const response = await axios.patch('/api/user/profile', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(prev => ({
        ...prev,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone
      }));
      setEditMode(prev => ({ ...prev, general: false }));
      setLocalError(null);
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };



  const handleSignOut = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Failed to sign out');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileUpload = () => {}

  const handleEditPhoto  = () => {

  }

  const handleDeleteAccount = () => {}


  if (loading || isUpdating) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error || localError) {
    return <div className="error">{error || localError}</div>;
  }

  if (!user) {
    return <div className="error">No user data available.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>User Profile</h1>
        </div>
        <div className="profile-header">
          <h1>{user.fullName}</h1>
          <img src={user.imageUrl} alt="Profile" className="profile-photo" />
          <p>{user.bio || "Test User"}</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-photo-container">
              <img 
                src={user.profilePhoto || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="profile-photo"
              />
              <button 
                onClick={handleEditPhoto}
                className="edit-photo-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="file-input"
              />
            </div>
            {/* User profile page */}
            <div className='profile-main'>
                <p><strong>Age:</strong> {user.age || 20}</p>
                <p><strong>Gender:</strong> {user.gender || 'Female'}</p>
                <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString() || new Date().toLocaleDateString()}</p>
                <p><strong>Role:</strong> {user.role || 'User'}</p>
                <p><strong>Location:</strong> {user.location?.coordinates?.join(", ")}</p>
                <p><strong>Preferences:</strong> {user.preferences?.tags?.join(", ")}</p>
                <p><strong>Language:</strong> {user.preferences?.language}</p>
                <p><strong>Notifications:</strong> {user.preferences?.notificationsEnabled ? "On" : "Off"}</p>
                {user.escortProfile && (
                    <div className="escort-section">
                    <h2>Escort Profile</h2>
                    <p><strong>Tags:</strong> {user.escortProfile.tags.join(", ")}</p>
                    <p><strong>Completed Bookings:</strong> {user.escortProfile.stats.completedBookings}</p>
                    <div>
                        <h3>Services</h3>
                        <ul>
                        {user.escortProfile.services.map(service => (
                            <li key={service._id}>
                            <strong>{service.name}</strong> - ${service.hourlyRate}/hr<br />
                            <span>{service.description}</span>
                            </li>
                    ))}
                  </ul>
                    </div>
                    <div>
                        <h3>Availability</h3>
                        <ul>
                        {user.escortProfile.availability.map(day => (
                            <li key={day._id}>
                            <strong>{day.day}:</strong>{" "}
                            {day.slots.map(slot => (
                                <span key={slot._id}>
                                {new Date(slot.start).toLocaleTimeString()} - {new Date(slot.end).toLocaleTimeString()}
                                </span>
                            ))}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                )}
            </div>

{/* Dashboard Nav Navigation */}
            <nav className="sidebar-nav">
              <button className="nav-btn">Bookings</button>
              <button className="nav-btn">Payments</button>
              <button className="nav-btn">Favorites</button>
              <button className="nav-btn">Wishlist</button>
              <div className="nav-divider"></div>
              <button 
                onClick={handleSignOut}
                className="nav-btn"
              >
                Sign out
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="delete-account-btn"
              >
                Delete account
              </button>
            </nav>
          </div>


          <div className="profile-main">
            {(error || localError) && <div className="error-message">{error || localError}</div>}

            <div className="section">
              <h2>Security</h2>
              <div className="section-content">
                <div className="field">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>

                {editMode.security ? (
                  <div className="edit-form">
                    <div className="field">
                      <label>Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="field">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="field">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="action-btns">
                      <button
                        onClick={saveSecurityChanges}
                        className="primary-btn"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditMode(prev => ({ ...prev, security: false }))}
                        className="secondary-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="view-mode">
                    <div className="action-btns">
                      <button
                        onClick={() => setEditMode(prev => ({ ...prev, security: true }))}
                        className="primary-btn"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="section">
              <h2>General Information</h2>
              {editMode.general ? (
                <div className="edit-form">
                  <div className="form-grid">
                    <div className="field">
                      <label>First name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="field">
                      <label>Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label>Phone number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="action-btns">
                    <button
                      onClick={saveGeneralInfo}
                      className="primary-btn"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditMode(prev => ({ ...prev, general: false }))}
                      className="secondary-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode">
                  <div className="form-grid">
                    <div className="field">
                      <label>First name</label>
                      <p>{user.firstName}</p>
                    </div>
                    <div className="field">
                      <label>Last name</label>
                      <p>{user.lastName}</p>
                    </div>
                  </div>
                  <div className="field">
                    <label>Phone number</label>
                    <p>{user.phone}</p>
                  </div>
                  <button
                    onClick={() => setEditMode(prev => ({ ...prev, general: true }))}
                    className="primary-btn"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/')}
              className="back-btn"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;