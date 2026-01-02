import React, { useEffect, useState, useContext, useRef } from "react";
import api from "../api/axios";



//u //
import { AuthContext } from "../context/AuthContext";

import "./h.css";
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

    const newReview = res.data.review;
setReviews((prev) => [newReview, ...prev]);

    //setReviews([res.data.review, ...reviews]);
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
          <img
            src={cat.iconUrl || cat.icon}
            alt={cat.name}
            className="category-img"
          />
        </div>
        <p className="category-title">{cat.name}</p>
      </Link>
    ))}
  </div>
</section>


      {/* 🔹 Policy Section */}
     



 



{/* 🔹 Premium Policies Section */}
<section className="premium-policies">
  <h2 className="section-heading">Top Insurance Policies for You</h2>
  <p className="section-subheading">
    Carefully selected policies with best coverage and minimal premiums.
  </p>

  <div className="premium-policy-grid">
    {policies.slice(0, 12).map((p) => (
      <motion.div
        className="premium-policy-card"
        key={p._id}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate(`/policy/${p._id}`)}
      >
        <div className="policy-img-wrapper">
          <img src={p.imageUrl || p.image} alt={p.title} />
        </div>
        <div className="policy-content">
          <h3>{p.title}</h3>
          <p className="category">{p.category?.name || "General Insurance"}</p>
          <div className="policy-stats">
            <span>💰 Life Cover: {p.lifeCover}</span>
            <span>✅ Claim: {p.claimSettlement}%</span>
          </div>
          <button className="compare-btn">Compare Now</button>
        </div>
      </motion.div>
    ))}
  </div>
</section>




      
    {/* 🌟 Premium Feature Highlights */}
<section className="features">
  <div className="feature-box blue">
    💰 <span>Save Big on Premiums</span>
  </div>
  <div className="feature-box orange">
    ⚡ <span>Fast Claim Settlement</span>
  </div>
  <div className="feature-box green">
    🛡️ <span>100% Secure Transactions</span>
  </div>
</section>

{/* 🌟 Info Statistics */}
<section className="info-icons">
  <div>
    🏦 <span>50+ Insurance Partners</span>
  </div>
  <div>
    🕐 <span>24x7 Support</span>
  </div>
  <div>
    👥 <span>5M+ Trusted Users</span>
  </div>
  <div>
    🚀 <span>Instant Policy Comparison</span>
  </div>
</section>





{/* 🔹 Policy Insights Hero Section (Minimal Design) */}
{ <section className="insight-hero clean">
  {/* <div className="insight-left">
    <h1>Smarter Protection for Every Family</h1>
    <p>
      Compare top insurance plans, understand what fits you best, and make
      confident choices — all in one platform built for transparency and trust.
    </p>
    <button className="explore-btn">Explore Plans</button>
  </div> */}

<div className="insight-left">
        <h1>Smarter Protection for Every Family</h1>
        <p>
          Compare top insurance plans, understand what fits you best, and make
          confident choices — all in one platform built for transparency and trust.
        </p>
        <button
          className="explore-btn"
          onClick={() => navigate("/know-more")}
        >
          Know More
        </button>
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
</section> }
 


{/* 🔹 Our Advantages Section */}


<section className="advantage-section">
  <h2 className="advantage-title">Why Choose Us</h2>
  <p className="advantage-subtext">
    When you choose us, you get more than just insurance — you get trust,
    transparency, and a partner who’s with you at every step.
  </p>

  <div className="advantage-grid">
    {[
      {
        icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
        title: "Best Prices Guaranteed",
        desc: "Instant quotes from top insurers with unbeatable premium options.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        title: "Unbiased Expert Advice",
        desc: "Recommendations that keep customers first — always.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/942/942799.png",
        title: "100% Reliable & Secure",
        desc: "Fully regulated by IRDAI — ensuring your safety and peace of mind.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
        title: "Hassle-free Claim Support",
        desc: "We simplify your claim process for a quick and stress-free experience.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/868/868786.png",
        title: "Here for You, Always",
        desc: "Friendly customer support available every day of the week.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/2910/2910762.png",
        title: "Exclusive Offers & Deals",
        desc: "Special discounts and offers curated only for our customers.",
      },

      {
        icon: "https://cdn-icons-png.flaticon.com/512/3103/3103446.png",
        title: "Simple & Fast Process",
        desc: "From quote to claim — everything in a few clicks.",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/476/476863.png",
        title: "Trusted by Millions",
        desc: "Over 5 million+ users rely on our platform for secure insurance.",
      },
    ].map((item, idx) => (
      <div key={idx} className="advantage-box">
        <div className="advantage-icon">
          <img src={item.icon} alt={item.title} />
        </div>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    ))}
  </div>

  {/* <button className="know-more-btn">Know More</button> */}

  <button
  className="know-more-btn"
  onClick={() => navigate("/why-choose-us")}
>
  Know More
</button>
</section>


      




{/* 🔹 Reviews Section */}
<section className="reviews">
  <h2 className="reviews-title">💬 What Our Users Say</h2>

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
    <p className="login-prompt">Please login to share your review 😊</p>
  )}

  <div className="review-carousel-wrapper">
    <div className="review-carousel">
      {/* {reviews.length > 0 ? (
        [...reviews, ...reviews].map((r, idx) => (
          <div className="review-card" key={r._id || idx}>
            <div className="review-header">
              <div className="avatar">
                {r.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <h4>{r.user?.name || "Anonymous"}</h4>
            </div>
            <p className="review-text">“{r.comment}”</p>
            <div className="review-rating">
              {Array.from({ length: r.rating }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
              <span className="rating-number">{r.rating}/5</span>
            </div>
          </div>
        ))
      ) : (
        <p className="no-review">No reviews yet. Be the first to share!</p>
      )} */}

{reviews.length > 0 ? (
  [...reviews, ...reviews].map((r, idx) => (
    <div
      className="review-card"
      key={`${r._id}-${idx}`}
    >
      <div className="review-header">
        <div className="avatar">
          {r.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <h4>{r.user?.name || "Anonymous"}</h4>
      </div>

      <p className="review-text">“{r.comment}”</p>

      <div className="review-rating">
        {Array.from({ length: r.rating }, (_, i) => (
          <span key={i}>⭐</span>
        ))}
        <span className="rating-number">{r.rating}/5</span>
      </div>
    </div>
  ))
) : (
  <p className="no-review">No reviews yet. Be the first to share!</p>
)}


    </div>
  </div>
</section>




{/* 🔹 Insurance Tips */}


<section className="tips-section">
  <h2>💡 Smart Insurance Tips</h2>
  <div className="tips-grid">
   
    <div className="tip-card">🧾 Compare plans yearly for better deals.</div>
   
    <div className="tip-card">👨‍👩‍👧 Get family floater for cost-effective health cover.</div>
    <div className="tip-card">⚡ Choose riders wisely — only what adds real value.</div>
    <div className="tip-card">🔒 Always read the fine print for hidden charges.</div>
  </div>
</section>



    


      <section className="partners">
  <h2 className="partners-title">🤝 Our Trusted Partners</h2>

  <div className="partner-carousel">
    <div className="partner-track">
      {partners.map((p) => (
        <Link
          to={`/post/${p.title.replace(/\s+/g, "-").toLowerCase()}`}

         
          key={p._id}
          className="partner-card"
        >
          <div className="partner-img-wrapper">
            <img src={p.iconUrl || p.image} alt={p.title} />
          </div>
          <p>{p.title}</p>
        </Link>
      ))}
    </div>
  </div>
</section>


      

    
  
    </div>
  );
};

export default Home;




