"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaMapPin } from "react-icons/fa"
import "./Destinations.css"

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const destinations = [
    {
      id: 1,
      name: "Mount Cameroon",
      location: "Buea, Cameroon",
      category: "Mountain",
      description: "Hike the highest mountain in West Africa with breathtaking views of the surrounding landscape.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
      id: 2,
      name: "Seme Beach",
      location: "Limbe, Cameroon",
      category: "Coastal",
      description: "Pristine sandy beaches with crystal clear waters and palm trees.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 3,
      name: "Elephant Country",
      location: "Garoua, Cameroon",
      category: "Safari",
      description: "Experience wildlife in their natural habitat with guided safari tours.",
      image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56",
    },
    {
      id: 4,
      name: "Independence Monument",
      location: "Yaoundé, Cameroon",
      category: "Cultural",
      description: "Visit the iconic monument and learn about the rich history and culture.",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    },
    {
      id: 5,
      name: "Korup National Park",
      location: "Southwest Region, Cameroon",
      category: "Safari",
      description: "One of Africa's oldest and richest rainforests with diverse wildlife and plant species.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    },
    {
      id: 6,
      name: "Kribi Beach",
      location: "Kribi, Cameroon",
      category: "Coastal",
      description: "Beautiful golden beaches with the unique Lobe Waterfalls that flow directly into the ocean.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206",
    },
    {
      id: 7,
      name: "Bimbia Slave Port",
      location: "Limbe, Cameroon",
      category: "Cultural",
      description: "Historical site that served as a major slave trading port during the transatlantic slave trade.",
      image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7",
    },
    {
      id: 8,
      name: "Mandara Mountains",
      location: "Far North Region, Cameroon",
      category: "Mountain",
      description: "Stunning mountain range with unique villages built into the rocky terrain.",
      image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
    },
  ]

  const categories = ["All Categories", "Mountain", "Coastal", "Safari", "Cultural"]

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || destination.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <div className="container">
          <h1>Explore Amazing Destinations</h1>
          <p>
            Discover breathtaking locations across Cameroon. From mountains to beaches, cultural sites to wildlife
            reserves, find your perfect adventure.
          </p>

         
        </div>
      </div>

     
    </div>
  )
}

export default Destinations
