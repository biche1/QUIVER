"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaMapPin, FaStar, FaSearch } from "react-icons/fa"
import "./TourGuides.css"

const TourGuides = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")

  const guides = [
    {
      id: 1,
      name: "Maria Rodriguez",
      location: "Barcelona, Spain",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.9,
      reviews: 127,
      specialties: ["Architecture", "Food", "History"],
      languages: ["English", "Spanish", "Catalan"],
      experience: "8 years",
      bio: "Passionate guide with extensive knowledge of Barcelona's architecture and culinary scene.",
    },
    {
      id: 2,
      name: "Akira Tanaka",
      location: "Kyoto, Japan",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      reviews: 93,
      specialties: ["Traditional Culture", "Gardens", "Temples"],
      languages: ["English", "Japanese"],
      experience: "12 years",
      bio: "Expert in Japanese traditional culture and history with special focus on Kyoto's temples and gardens.",
    },
    {
      id: 3,
      name: "Sophie Martin",
      location: "Paris, France",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4.7,
      reviews: 156,
      specialties: ["Art", "Fashion", "History"],
      languages: ["English", "French", "German"],
      experience: "6 years",
      bio: "Art historian specializing in Parisian museums and fashion districts.",
    },
    {
      id: 4,
      name: "John Mbeki",
      location: "Nairobi, Kenya",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 4.9,
      reviews: 112,
      specialties: ["Wildlife", "Safari", "Photography"],
      languages: ["English", "Swahili"],
      experience: "15 years",
      bio: "Wildlife expert with extensive knowledge of Kenya's national parks and conservation efforts.",
    },
    {
      id: 5,
      name: "Elena Petrova",
      location: "St. Petersburg, Russia",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 4.8,
      reviews: 87,
      specialties: ["History", "Architecture", "Museums"],
      languages: ["English", "Russian", "French"],
      experience: "9 years",
      bio: "Former museum curator with deep knowledge of Russian history and cultural heritage.",
    },
    {
      id: 6,
      name: "Carlos Mendoza",
      location: "Mexico City, Mexico",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 4.6,
      reviews: 104,
      specialties: ["Food", "Ancient Civilizations", "Urban Culture"],
      languages: ["English", "Spanish"],
      experience: "7 years",
      bio: "Culinary expert and historian specializing in Mexican cuisine and pre-Columbian civilizations.",
    },
    {
      id: 7,
      name: "Aisha Rahman",
      location: "Marrakech, Morocco",
      image: "https://randomuser.me/api/portraits/women/37.jpg",
      rating: 4.9,
      reviews: 132,
      specialties: ["Markets", "Crafts", "Culture"],
      languages: ["English", "Arabic", "French"],
      experience: "11 years",
      bio: "Expert in Moroccan culture with special knowledge of traditional crafts and medina navigation.",
    },
    {
      id: 8,
      name: "David Chen",
      location: "Hong Kong",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.7,
      reviews: 95,
      specialties: ["Urban Exploration", "Food", "History"],
      languages: ["English", "Cantonese", "Mandarin"],
      experience: "8 years",
      bio: "Urban explorer who knows all of Hong Kong's hidden gems and best local eateries.",
    },
  ]

  const specialties = [
    "All Specialties",
    "Architecture",
    "Food",
    "History",
    "Art",
    "Wildlife",
    "Culture",
    "Photography",
    "Urban Exploration",
    "Markets",
    "Traditional Culture",
    "Fashion",
  ]

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.bio.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty =
      selectedSpecialty === "All Specialties" || guide.specialties.some((specialty) => specialty === selectedSpecialty)

    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="tour-guides-page">
      <div className="tour-guides-hero">
        <div className="container">
          <h1>Meet Our Expert Tour Guides</h1>
          <p>
            Connect with knowledgeable local guides who will enhance your travel experience and show you the hidden gems
            of each destination.
          </p>

          
        </div>
      </div>

    
    </div>
  )
}
export default TourGuides
