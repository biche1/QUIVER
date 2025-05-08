import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"
import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quiver</h3>
            <p>
              Connect with experienced local guides who will make your trip unforgettable. Discover hidden gems, immerse
              in local culture, and create memories that last a lifetime.
            </p>
            <div className="social-icons">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/escorts">Escorts</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Popular Destinations</h3>
            <ul>
              <li>
                <Link to="#">mount cameroon </Link>
              </li>
              <li>
                <Link to="#">seme beach</Link>
              </li>
              <li>
                <Link to="#">mechum fall</Link>
              </li>
              <li>
                <Link to="#">monument</Link>
              </li>
              <li>
                <Link to="#">something</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@quiver.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Travel Street, Buea, AC 12345</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Quiver. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
