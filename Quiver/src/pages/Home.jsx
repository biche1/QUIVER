import { Link } from "react-router-dom"
import { FaMapPin, FaStar } from "react-icons/fa"
import { popularDestinations, featuredGuides } from "../data/mockData"
import "./Home.css"

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-tag">Book - Connect - Experience</div>
            <h1>Connecting You To <span>Trusted</span> Companions...</h1>
            <h2>Seamless, safe and on <span>Your</span> Terms</h2>
            <p>
              Connect with experienced local guides who will make your trip unforgettable. Discover hidden gems, immerse
              in local culture, and create memories that last a lifetime.
            </p>
            <div className="hero-buttons">
              <Link to="/tour-guides" className="btn btn-primary">
                Become an Escort
              </Link>
              <Link to="/escorts" className="btn btn-outline">
                Find a Guide
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Guides Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Expert Guides</h2>
            <p>The masterminds behind a seamless leisure and or business experience</p>
          </div>

          <div className="guides-grid">
            {featuredGuides.map((guide) => (
              <div className="guide-card" key={guide.id}>
                <div className="guide-image">
                  <img src={guide.image || "/placeholder.svg"} alt={guide.name} />
                </div>
                <div className="guide-content">
                  <h3>{guide.name}</h3>
                  <p className="guide-location">
                    <FaMapPin size={14} />
                    {guide.location}
                  </p>
                  {/* <div className="guide-rating">
                    <FaStar size={14} />
                    <span>{guide.rating}</span>
                    <span className="guide-reviews">({guide.reviews} reviews)</span>
                  </div> */}
                  <div className="guide-specialties">
                    {guide.specialties.map((specialty, index) => (
                      <span key={index} className="guide-specialty">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <Link to={`/tour-guides/${guide.id}`} className="btn btn-sm btn-outline">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="section-footer">
            <Link to="/tour-guides" className="btn btn-outline">
              View All Guides
            </Link>
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Adventure?</h2>
            <p>Sign up today and connect with expert escorts around the country.</p>
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
