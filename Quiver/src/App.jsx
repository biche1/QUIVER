import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Destinations from "./pages/Destinations"
import TourGuides from "./pages/TourGuides"
import About from "./pages/About"
import Escorts from "./pages/Escorts"
import Contact from "./pages/Contact"
import Chatbot from "./components/Chatbot"
import UserProfile from "./pages/userprofile"
import { AuthProvider } from "./context/AuthContext"
import { UserProvider } from "./context/usercontext"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

function App() {
  console.log("App component rendering")
  return (
    <AuthProvider>
      <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Chatbot />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/tour-guides" element={<TourGuides />} />
            <Route path="/escorts" element={<Escorts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      </UserProvider>
    </AuthProvider>
  )
}

export default App


// App.jsx
// App.jsx
// App.jsx
// App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
// import Home from "./pages/Home"
// import Login from "./pages/Login"
// import Signup from "./pages/Signup"
// import Dashboard from "./pages/Dashboard"
// import Destinations from "./pages/Destinations"
// import DestinationDetail from "./pages/DestinationDetail"
// import TourGuides from "./pages/TourGuides"
// import About from "./pages/About"
// import Contact from "./pages/Contact"
// import { AuthProvider } from "./context/AuthContext"
// import ProtectedRoute from "./components/ProtectedRoute"
// import "./App.css"

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />  {/* Define your route for Home */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
