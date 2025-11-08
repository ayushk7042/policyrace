import React, { useEffect, useState, useContext, useRef } from "react";
import api from "../api/axios";



import { AuthContext } from "../context/AuthContext";

import "./Home.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);
  //const [calculators, setCalculators] = useState([]);
  const [partners, setPartners] = useState([]);
  const [reviews, setReviews] = useState([]);
const [comment, setComment] = useState("");
const [rating, setRating] = useState(0);


  //const [user, setUser] = useState(null);
  const navigate = useNavigate();
 const { user, logoutUser } = useContext(AuthContext);

 const [currentSlide, setCurrentSlide] = useState(0);
  // ✅ Fetch everything from backend
  useEffect(() => {
    const fetchAll = async () => {
      try {

        //const heroRes = await axios.get("http://localhost:5000/api/hero/sliders");
        const [ heroRes, catRes, policyRes, partnerRes, reviewRes] =
          await Promise.all([
            api.get("/hero/sliders"),
 //axios.get("http://localhost:5000/api/hero/sliders"),

            api.get("/categories"),
            api.get("/policies"),
           // api.get("/calculators"),
            api.get("/partners"),
            api.get("/hero/reviews"),
          ]);

          setHeroSlides(Array.isArray(heroRes.data) ? heroRes.data : heroRes.data.sliders || []);
//console.log("✅ Loaded Hero Slides:", Array.isArray(heroRes.data) ? heroRes.data : heroRes.data.sliders);

       // setHeroSlides(heroRes.data);
        // setCategories(catRes.data);
        // setPolicies(policyRes.data.slice(0, 20));
        // //setCalculators(calcRes.data);
        // setPartners(partnerRes.data);
        // setReviews(reviewRes.data);

// ✅ Fix for Categories
const catArray = Array.isArray(catRes.data)
  ? catRes.data
  : catRes.data.categories || [];
setCategories(catArray);

// ✅ Fix for Policies
const policyArray = Array.isArray(policyRes.data)
  ? policyRes.data
  : policyRes.data.policies || [];
setPolicies(policyArray.slice(0, 20));

// ✅ Fix for Partners
const partnerArray = Array.isArray(partnerRes.data)
  ? partnerRes.data
  : partnerRes.data.partners || [];
setPartners(partnerArray);

// ✅ Fix for Reviews
const reviewArray = Array.isArray(reviewRes.data)
  ? reviewRes.data
  : reviewRes.data.reviews || [];
setReviews(reviewArray);

      } catch (err) {
        console.error("Error fetching homepage data:", err);
      }
    };
    fetchAll();
  }, []);


const carouselRef = useRef();

useEffect(() => {
  const interval = setInterval(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);


  const handleLogout = () => {
  logoutUser();  // clears user state and removes token from localStorage
  navigate("/login");
};

//console.log("Hero Slides in State:", heroSlides);

// ✅ Submit review handler
const handleAddReview = async () => {
  if (!comment || !rating) {
    alert("Please add both comment and rating!");
    return;
  }
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(
      "/hero/reviews",
      { comment, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setReviews([res.data.review, ...reviews]);
    setComment("");
    setRating(0);
    alert("✅ Review added successfully!");
  } catch (err) {
    console.error("Error adding review:", err);
    alert("❌ Failed to add review.");
  }
};









useEffect(() => {
  if (heroSlides.length === 0) return;

  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, 2000); // every 2 seconds

  return () => clearInterval(interval);
}, [heroSlides]);

  return (
    <div className="homepage">
      {/* 🔹 Navbar */}
     



{/* 🔹 Hero Section - PolicyBazaar Style */}
<section className="hero-section">
  <div className="hero-left">
    <div className="hero-slider">
      {heroSlides.length > 0 ? (
        <motion.div
          key={heroSlides[0]._id}
          className="hero-slide fade-slide"
        >
          <img
            src={heroSlides[currentSlide]?.imageUrl || "https://via.placeholder.com/800x400"}
            alt={heroSlides[currentSlide]?.title || "Slide"}
            className="hero-image"
          />
          <div className="hero-overlay">
            <h2>{heroSlides[currentSlide]?.title}</h2>
            {heroSlides[currentSlide]?.viewPlansLink && (
              <Link to={heroSlides[currentSlide].viewPlansLink} className="hero-btn">
                View Plans
              </Link>
            )}
          </div>
        </motion.div>
      ) : (
        <p>Loading slides...</p>
      )}
    </div>
  </div>

  <div className="hero-right">
    <div className="hero-right-content">
      <h1>Compare, Choose & Save on Insurance Policies</h1>
      <p>
        Find the best Life, Health, and Motor Insurance plans from top
        providers in minutes — trusted by millions of users across India.
      </p>
      <Link to="/policies" className="hero-big-btn">
        Explore Policies
      </Link>
    </div>
  </div>
</section>




      {/* 🔹 Categories Section */}
     

      {/* 🟣 Insurance Categories Section */}
<section className="categories-section">
  <h2 className="section-heading">Explore Insurance Categories</h2>

  <div className="categories-container">
    {categories.slice(0, 14).map((cat) => (
      <Link
        to={`/category/${cat._id}`}
        key={cat._id}
        className="category-card"
      >
        <div className="category-image-wrapper">
          <img src={cat.iconUrl || cat.icon} alt={cat.name} />
        </div>
        <p className="category-title">{cat.name}</p>
      </Link>
    ))}
  </div>
</section>


      {/* 🔹 Policy Section */}
     





{/* <section className="policies">
  <h2>Top Insurance Policies</h2>
  <div className="policy-grid">
    {policies.map((p) => (
      <div className="policy-item" key={p._id}>
        <div className="policy-top">
          <img
            src={p.imageUrl || p.image}
            alt={p.title}
            className="policy-icon"
          />
          <div className="policy-info">
            <h3>{p.title}</h3>
            <p className="category">{p.category?.name || "General Insurance"}</p>
          </div>
        </div>

        <div className="policy-bottom">
          <span>Life Cover: {p.lifeCover}</span>
          <span>Claim: {p.claimSettlement}%</span>
        </div>
      </div>
    ))}
  </div>
</section>
 */}



 <section className="policies">
  <h2>Top Insurance Policies</h2>
  <div className="policy-grid">
    {policies.map((p) => (
      <div
        className="policy-item"
        key={p._id}
        onClick={() => navigate(`/policy/${p._id}`)} // 👈 click navigation
        style={{ cursor: "pointer" }}
      >
        <div className="policy-top">
          <img
            src={p.imageUrl || p.image}
            alt={p.title}
            className="policy-icon"
          />
          <div className="policy-info">
            <h3>{p.title}</h3>
            <p className="category">{p.category?.name || "General Insurance"}</p>
          </div>
        </div>

        <div className="policy-bottom">
          <span>Life Cover: {p.lifeCover}</span>
          <span>Claim: {p.claimSettlement}%</span>
        </div>
      </div>
    ))}
  </div>
</section>




      {/* 🔹 Feature Boxes */}
      <section className="features">
        <div className="feature-box blue">💰 Save Big on Premiums</div>
        <div className="feature-box orange">⚡ Fast Claim Settlement</div>
        <div className="feature-box green">🛡️ 100% Secure Transactions</div>
      </section>

      {/* 🔹 Info Icons */}
      <section className="info-icons">
        <div>🏦 50+ Insurance Partners</div>
        <div>🕐 24x7 Support</div>
        <div>👥 5M+ Users</div>
        <div>🚀 Instant Comparison</div>
      </section>

    
{/* 🔹 Policy Insights Hero Section (Minimal Design) */}
<section className="insight-hero clean">
  <div className="insight-left">
    <h1>Smarter Protection for Every Family</h1>
    <p>
      Compare top insurance plans, understand what fits you best, and make
      confident choices — all in one platform built for transparency and trust.
    </p>
    <button className="explore-btn">Explore Plans</button>
  </div>

  <div className="insight-right clean-icons">
    <div className="insight-item">
      <img src="https://cdn-icons-png.flaticon.com/512/942/942799.png" alt="Trusted Plans" />
      <div>
        <h3>Top-Rated Plans</h3>
        <p>Compare policies trusted by 1M+ users across India.</p>
      </div>
    </div>

    <div className="insight-item">
      <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" alt="Quick Claims" />
      <div>
        <h3>Fast Claims</h3>
        <p>Get claim support that’s quick, simple, and stress-free.</p>
      </div>
    </div>

    <div className="insight-item">
      <img src="https://cdn-icons-png.flaticon.com/512/868/868786.png" alt="Customer Care" />
      <div>
        <h3>24x7 Assistance</h3>
        <p>Always here for you — every day of the week.</p>
      </div>
    </div>

    <div className="insight-item">
      <img src="https://cdn-icons-png.flaticon.com/512/1041/1041057.png" alt="Secure Coverage" />
      <div>
        <h3>Secure Coverage</h3>
        <p>IRDAI-regulated plans ensuring 100% reliability.</p>
      </div>
    </div>
  </div>
</section>




{/* 🔹 Our Advantages Section */}
<section className="advantage-section">
  <h2>Why Choose Us</h2>
  <p className="advantage-subtext">
    When you choose us, you get more than just insurance. You get trust,
    transparency, and a partner who’s with you at every step.
  </p>

  <div className="advantage-grid">
    <motion.div
      className="advantage-box"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
        alt="Best Prices"
      />
      <h3>Best Prices Guaranteed</h3>
      <p>Instant quotes from top insurers with unbeatable premium options.</p>
    </motion.div>

    <motion.div
      className="advantage-box"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Unbiased Advice"
      />
      <h3>Unbiased Expert Advice</h3>
      <p>Recommendations that keep customers first — always.</p>
    </motion.div>

    <motion.div
      className="advantage-box"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/942/942799.png"
        alt="Reliable"
      />
      <h3>100% Reliable & Secure</h3>
      <p>Fully regulated by IRDAI — ensuring your safety and peace of mind.</p>
    </motion.div>

    <motion.div
      className="advantage-box"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
        alt="Claim Support"
      />
      <h3>Hassle-free Claim Support</h3>
      <p>We simplify your claim process for a quick and stress-free experience.</p>
    </motion.div>

    <motion.div
      className="advantage-box"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/868/868786.png"
        alt="Customer Support"
      />
      <h3>Here for You, Always</h3>
      <p>Friendly customer support available every day of the week.</p>
    </motion.div>

<motion.div
  className="advantage-box"
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/2910/2910762.png"
    alt="Exclusive Offers"
  />
  <h3>Exclusive Offers & Deals</h3>
  <p>Special discounts and offers curated only for our customers.</p>
</motion.div>


  </div>

  <button className="know-more-btn">Know More</button>
</section>



      


{/* <section className="reviews">
  <h2>What Our Users Say</h2>

  <div className="review-carousel">
    {reviews.map((r) => (
      <div className="review-card" key={r._id}>
        <h4>{r.userName}</h4>
        <p>"{r.comment}"</p>
        <span>⭐ {r.rating}/5</span>
      </div>
    ))}
  </div>
</section> */}


{/* 🔹 Reviews Section */}
<section className="reviews">
  <h2>What Our Users Say</h2>

  {/* 🔸 Review Form (Only for Logged-in Users) */}
  {user ? (
    <div className="review-form">
      <h3>Share Your Experience</h3>
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="rating-select">
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            className={`star ${rating >= num ? "active" : ""}`}
            onClick={() => setRating(num)}
          >
            ⭐
          </span>
        ))}
      </div>
      <button onClick={handleAddReview}>Submit Review</button>
    </div>
  ) : (
    <p className="login-prompt">Please login to share your review.</p>
  )}

  {/* 🔸 Review Display Carousel */}
  <div className="review-carousel">
    {reviews.length > 0 ? (
      reviews.map((r) => (
        <div className="review-card" key={r._id}>
          <h4>{r.user?.name || "Anonymous"}</h4>
          <p>"{r.comment}"</p>
          <span>⭐ {r.rating}/5</span>
        </div>
      ))
    ) : (
      <p>No reviews yet. Be the first to share your experience!</p>
    )}
  </div>
</section>




{/* 🔹 Insurance Tips */}
<section className="tips-section">
  <h2>Smart Insurance Tips</h2>
  <div className="tips-grid">
    <div className="tip-card">📅 Always renew before expiry to keep benefits active.</div>
    <div className="tip-card">🧾 Compare plans yearly for better deals.</div>
    <div className="tip-card">💰 Use online payment discounts for lower premiums.</div>
    <div className="tip-card">👨‍👩‍👧 Get family floater for cost-effective health cover.</div>
  </div>
</section>



      {/* 🔹 Partners Section */}
      <section className="partners">
        <h2>Our Trusted Partners</h2>
        <div className="partner-grid">
          {partners.map((p) => (
            <Link to={`/post/${p.title.replace(/\s+/g, "-").toLowerCase()}`} key={p._id} className="partner-card">
              <img src={p.iconUrl || p.image} alt={p.title} />
              <p>{p.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔹 Footer */}
      <footer className="footer">
        <p>© 2025 PolicyRace. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;




