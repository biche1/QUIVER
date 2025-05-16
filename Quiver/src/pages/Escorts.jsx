"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaMapPin, FaStar, FaHeart } from "react-icons/fa"
import "./Escorts.css"


const escortsData = [
  {
    id: 1,
    name: "Marie Ngwa",
    location: "Douala, Cameroon",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    languages: ["French"],
    rating: 4.7,
    reviews: 72,
    badge: "Top 20%",
    price: 80,
    age: 28,
    gender: "Female",
    specialties: ["City Tours", "Cultural Experiences", "Food Tours"],
    bio: "Professional tour guide with 5 years of experience showing visitors the best of Douala.",
  },
  {
    id: 2,
    name: "Marie Ngwa",
    location: "Douala, Cameroon",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    languages: ["English"],
    rating: 4.7,
    reviews: 125,
    badge: "Top 5%",
    price: 85,
    age: 28,
    gender: "Female",
    specialties: ["City Tours", "Cultural Experiences", "Food Tours"],
    bio: "Professional tour guide with 5 years of experience showing visitors the best of Douala.",
  },
  {
    id: 3,
    name: "Marie Ngwa",
    location: "Douala, Cameroon",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    languages: ["Bilingual"],
    rating: 5,
    reviews: 565,
    badge: "",
    price: 90,
    age: 28,
    gender: "Female",
    specialties: ["City Tours", "Cultural Experiences", "Food Tours"],
    bio: "Professional tour guide with 5 years of experience showing visitors the best of Douala.",
  },
  {
    id: 4,
    name: "John Mbeki",
    location: "Yaoundé, Cameroon",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    languages: ["French", "English"],
    rating: 4.8,
    reviews: 98,
    badge: "Top 10%",
    price: 75,
    age: 34,
    gender: "Male",
    specialties: ["Adventure Tours", "Wildlife", "Photography"],
    bio: "Experienced guide specializing in adventure tours and wildlife photography in Cameroon.",
  },
  {
    id: 5,
    name: "Sophie Atangana",
    location: "Kribi, Cameroon",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    languages: ["French", "English"],
    rating: 4.9,
    reviews: 210,
    badge: "Top 1%",
    price: 95,
    age: 31,
    gender: "Female",
    specialties: ["Beach Tours", "Boat Excursions", "Fishing"],
    bio: "Beach and coastal expert with extensive knowledge of Kribi's beautiful shores and marine life.",
  },
  {
    id: 6,
    name: "Robert Fono",
    location: "Limbe, Cameroon",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    languages: ["English"],
    rating: 4.6,
    reviews: 87,
    badge: "",
    price: 70,
    age: 40,
    gender: "Male",
    specialties: ["Hiking", "Mountain Tours", "Camping"],
    bio: "Mountain guide with 15 years of experience leading tours around Mount Cameroon.",
  },
  {
    id: 7,
    name: "Esther Nkolo",
    location: "Bafoussam, Cameroon",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    languages: ["French"],
    rating: 4.8,
    reviews: 65,
    badge: "",
    price: 65,
    age: 27,
    gender: "Female",
    specialties: ["Cultural Tours", "Traditional Crafts", "Local Markets"],
    bio: "Cultural expert showcasing the rich traditions and crafts of Western Cameroon.",
  },
  {
    id: 8,
    name: "Paul Biya",
    location: "Buea, Cameroon",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
    languages: ["English", "French"],
    rating: 4.5,
    reviews: 112,
    badge: "",
    price: 80,
    age: 45,
    gender: "Male",
    specialties: ["Historical Tours", "Educational Visits", "University Tours"],
    bio: "History professor offering educational tours around Buea and its historical landmarks.",
  },
  {
    id: 9,
    name: "Aisha Ndom",
    location: "Maroua, Cameroon",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
    languages: ["French"],
    rating: 4.9,
    reviews: 78,
    badge: "Top 15%",
    price: 85,
    age: 33,
    gender: "Female",
    specialties: ["Desert Tours", "Cultural Immersion", "Traditional Cuisine"],
    bio: "Expert in northern Cameroon's unique culture, cuisine, and desert landscapes.",
  },
  {
    id: 10,
    name: "David Eto",
    location: "Bamenda, Cameroon",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    languages: ["English"],
    rating: 4.7,
    reviews: 91,
    badge: "",
    price: 75,
    age: 36,
    gender: "Male",
    specialties: ["Grassfields Tours", "Traditional Palaces", "Cultural Festivals"],
    bio: "Specialist in the rich cultural heritage of Cameroon's Grassfields region.",
  },
  {
    id: 11,
    name: "Carine Meka",
    location: "Douala, Cameroon",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    languages: ["French", "English"],
    rating: 4.8,
    reviews: 103,
    badge: "Top 10%",
    price: 90,
    age: 29,
    gender: "Female",
    specialties: ["City Tours", "Shopping", "Nightlife"],
    bio: "Urban guide showcasing the best of Douala's vibrant city life, shopping, and entertainment.",
  },
  {
    id: 12,
    name: "Thomas Nkono",
    location: "Ebolowa, Cameroon",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    languages: ["French"],
    rating: 4.6,
    reviews: 58,
    badge: "",
    price: 65,
    age: 42,
    gender: "Male",
    specialties: ["Forest Excursions", "Wildlife Spotting", "Botanical Tours"],
    bio: "Nature expert with deep knowledge of southern Cameroon's forests and wildlife.",
  },
]


const Escorts = () => {
  const [showAllEscorts, setShowAllEscorts] = useState(false)
  const [guides, setGuides] = useState([])
  const [filteredGuides, setFilteredGuides] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [filters, setFilters] = useState({
    location: "",
    gender: "",
    minAge: "",
    maxAge: "",
    minRating: "",
    minPrice: "",
    maxPrice: "",
    language: "",
  })

  const guidesPerPage = 3
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage)

  useEffect(() => {
    // Load guides data
    setGuides(escortsData)
    setFilteredGuides(escortsData)

    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem("favoriteGuides")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    // Apply filters
    let result = guides

    if (filters.location) {
      result = result.filter((guide) => guide.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.gender) {
      result = result.filter((guide) => guide.gender === filters.gender)
    }

    if (filters.minAge) {
      result = result.filter((guide) => guide.age >= Number.parseInt(filters.minAge))
    }

    if (filters.maxAge) {
      result = result.filter((guide) => guide.age <= Number.parseInt(filters.maxAge))
    }

    if (filters.minRating) {
      result = result.filter((guide) => guide.rating >= Number.parseFloat(filters.minRating))
    }

    if (filters.minPrice) {
      result = result.filter((guide) => guide.price >= Number.parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter((guide) => guide.price <= Number.parseInt(filters.maxPrice))
    }

    if (filters.language) {
      result = result.filter((guide) =>
        guide.languages.some((lang) => lang.toLowerCase().includes(filters.language.toLowerCase())),
      )
    }

    setFilteredGuides(result)
    setCurrentPage(1)
  }, [filters, guides])

  const getCurrentGuides = () => {
    const indexOfLastGuide = currentPage * guidesPerPage
    const indexOfFirstGuide = indexOfLastGuide - guidesPerPage
    return filteredGuides.slice(indexOfFirstGuide, indexOfLastGuide)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenderSelect = (gender) => {
    setFilters((prev) => ({
      ...prev,
      gender: prev.gender === gender ? "" : gender,
    }))
  }

  const handleUpdateFilters = () => {
    // Filters are already applied via useEffect
    console.log("Filters updated")
  }

  // const handleClearFilters = () => {
  //   //Clears the filters 
  //   const [filters, setFilters] = useState ({
  //     category: '',
  //     priceRange: [0, 100],
  //     sortBy: 'newest'
  //   })
  // }

  const handleToggleFavorite = (guideId) => {
    let newFavorites
    if (favorites.includes(guideId)) {
      newFavorites = favorites.filter((id) => id !== guideId)
    } else {
      newFavorites = [...favorites, guideId]
    }
    setFavorites(newFavorites)
    localStorage.setItem("favoriteGuides", JSON.stringify(newFavorites))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleViewAllEscorts = () => {
    setShowAllEscorts(true)
  }

   return (
    <div className="escorts-page">
      <div className="escorts-hero">
        <div className="container">
          <h2>Don't have a destination in mind?</h2>
          <Link to="/destinations" className="btn btn-primary btn-large">
            SEE POPULAR DESTINATIONS
          </Link>
        </div>
      </div>

      <div className="container">
        {!showAllEscorts ? (
          <>
            <div className="find-guide-section">
              <h1>FIND YOUR PERFECT GUIDE</h1>

              <div className="guide-search-container">
                <div className="filter-sidebar">
                  <h3>Narrow your search</h3>
                  <p>Let us help you find your perfect escort by selecting your preferences below</p>

                  <div className="filter-group">
                    <label htmlFor="location">Select location...</label>
                    <div className="select-wrapper">
                      <select id="location" name="location" value={filters.location} onChange={handleFilterChange}>
                        <option value="">All locations</option>
                        <option value="Douala">Douala</option>
                        <option value="Yaoundé">Yaoundé</option>
                        <option value="Kribi">Kribi</option>
                        <option value="Limbe">Limbe</option>
                        <option value="Buea">Buea</option>
                      </select>
                    </div>
                  </div>

                  <div className="filters-section">
                    <h3>Filters</h3>
                    <p className="filter-hint">Click to activate or deactivate tag</p>

                    <div className="filter-category">
                      <h4>Gender</h4>
                      <div className="filter-buttons">
                        <button
                          className={`filter-btn ${filters.gender === "Male" ? "active" : ""}`}
                          onClick={() => handleGenderSelect("Male")}
                        >
                          Male
                        </button>
                        <button
                          className={`filter-btn ${filters.gender === "Female" ? "active" : ""}`}
                          onClick={() => handleGenderSelect("Female")}
                        >
                          Female
                        </button>
                      </div>
                    </div>

                    <div className="filter-category">
                      <h4>Age</h4>
                      <div className="range-inputs">
                        <input
                          type="number"
                          placeholder="Min"
                          name="minAge"
                          value={filters.minAge}
                          onChange={handleFilterChange}
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          name="maxAge"
                          value={filters.maxAge}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>

                    <div className="filter-category">
                      <h4>Ranking</h4>
                      <div className="rating-filter">
                        <select name="minRating" value={filters.minRating} onChange={handleFilterChange}>
                          <option value="">Any rating</option>
                          <option value="5">5 stars</option>
                          <option value="4.5">4.5+ stars</option>
                          <option value="4">4+ stars</option>
                        </select>
                      </div>
                    </div>

                    <div className="filter-category">
                      <h4>Price</h4>
                      <div className="range-inputs">
                        <input
                          type="number"
                          placeholder="Min $"
                          name="minPrice"
                          value={filters.minPrice}
                          onChange={handleFilterChange}
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="Max $"
                          name="maxPrice"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                        />
                      </div>
                    </div>

                    <div className="filter-category">
                      <h4>Language</h4>
                      <div className="language-filter">
                        <select name="language" value={filters.language} onChange={handleFilterChange}>
                          <option value="">Any language</option>
                          <option value="English">English</option>
                          <option value="French">French</option>
                          <option value="Bilingual">Bilingual</option>
                        </select>
                      </div>
                    </div>
                <div className="filter-buttons">
                    <button className="update-btn" onClick={handleUpdateFilters}>
                      Update
                    </button>
                    <button className="clear-btn">
                      Clear
                    </button>
                </div>
                    


                  </div>
                </div>

                <div className="guides-results">
                  <div className="guides-header">
                    <h2>Your perfect guide is one click away</h2>
                  </div>

                  <div className="guides-list">
                    {getCurrentGuides().map((guide) => (
                      <div className="guide-card" key={guide.id}>
                        <div className="guide-image">
                          <img src={guide.image || "/placeholder.svg"} alt={guide.name} />
                        </div>
                        <div className="guide-info">
                          <div className="guide-header">
                            <h3>{guide.name}</h3>
                            <div className="guide-location">
                              <FaMapPin size={14} />
                              <span>{guide.location}</span>
                            </div>
                          </div>

                          <div className="guide-badges">
                            {guide.languages.map((language, index) => (
                              <span key={index} className="language-badge">
                                {language}
                              </span>
                            ))}
                          </div>

                          {/* <div className="guide-rating">
                            <FaStar size={16} />
                            <span className="rating-value">{guide.rating}</span>
                            <span className="reviews-count">({guide.reviews} reviews)</span>
                          </div> */}

                          <div className="guide-actions">
                            <button
                              className={`favorite-btn ${favorites.includes(guide.id) ? "active" : ""}`}
                              onClick={() => handleToggleFavorite(guide.id)}
                            >
                              <FaHeart size={16} />
                            </button>
                            <Link to={`/tour-guide/${guide.id}`} className="btn btn-outline">
                              View Profile
                            </Link>
                           
                          </div>
                        </div>

                        {guide.badge && <div className="guide-badge-top">{guide.badge}</div>}
                      </div>
                    ))}
                  </div>

                  <div className="pagination">
                    <span>Pages</span>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`page-btn ${currentPage === page ? "active" : ""}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <div className="view-all-container">
                    <button className="btn btn-primary btn-large" onClick={handleViewAllEscorts}>
                      View all Escorts
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="all-escorts-section">
            <h1>All Available Guides</h1>

            <div className="all-guides-grid">
              {filteredGuides.map((guide) => (
                <div className="guide-card" key={guide.id}>
                  <div className="guide-image">
                    <img src={guide.image || "/placeholder.svg"} alt={guide.name} />
                  </div>
                  <div className="guide-info">
                    <div className="guide-header">
                      <h3>{guide.name}</h3>
                      <div className="guide-location">
                        <FaMapPin size={14} />
                        <span>{guide.location}</span>
                      </div>
                    </div>

                    <div className="guide-badges">
                      {guide.languages.map((language, index) => (
                        <span key={index} className="language-badge">
                          {language}
                        </span>
                      ))}
                    </div>

                    {/* <div className="guide-rating">
                      <FaStar size={16} />
                    <span className="rating-value">{guide.rating}</span>
                      <span className="reviews-count">({guide.reviews} reviews)</span>
                    </div> */}

                    <div className="guide-actions">
                      <button
                        className={`favorite-btn ${favorites.includes(guide.id) ? "active" : ""}`}
                        onClick={() => handleToggleFavorite(guide.id)}
                      >
                        <FaHeart size={16} />
                      </button>
                      <Link to={`/tour-guide/${guide.id}`} className="btn btn-outline">
                        View Profile
                      </Link>
                      <button className="btn btn-primary">Book</button>
                    </div>
                  </div>

                {guide.badge && <div className="guide-badge-top">{guide.badge}</div>}
                </div>
              ))}
            </div>

            <button className="btn btn-outline btn-large back-btn" onClick={() => setShowAllEscorts(false)}>
              Back to Search
            </button>
          </div>
        )}
      </div>
    </div>
   )
}

export default Escorts
