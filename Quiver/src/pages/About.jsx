import { Link } from "react-router-dom"
import { FaUsers, FaAward, FaGlobe, FaHeart } from "react-icons/fa"
import "./About.css"

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      bio: "With over 15 years in the travel industry, Sarah founded Quiver with a vision to connect travelers with authentic local experiences.",
    },
    {
      name: "Michael Chen",
      position: "Chief Operations Officer",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      bio: "Michael oversees our global operations and ensures that every Quiver experience meets our high standards of quality and authenticity.",
    },
    {
      name: "Aisha Patel",
      position: "Head of Guide Relations",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Aisha works directly with our network of guides, focusing on training, quality assurance, and community building.",
    },
    {
      name: "Carlos Rodriguez",
      position: "Chief Technology Officer",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
      bio: "Carlos leads our technology team, developing innovative solutions to connect travelers with the perfect guides for their adventures.",
    },
  ]

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About Quiver</h1>
        </div>
      </div>

      
    </div>
  )
}

export default About
