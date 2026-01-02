// import React from "react";
// import "./KnowMore.css";

// const KnowMore = () => {
//   return (
//     <div className="knowmore-page">

//       {/* HERO */}
//       <section className="knowmore-hero">
//         <h1>Your Insurance, Simplified</h1>
//         <p>
//           We help families across India make smarter insurance decisions with
//           clarity, transparency, and confidence.
//         </p>
//       </section>

//       {/* WHY US */}
//       <section className="knowmore-section">
//         <h2>Why Choose Us?</h2>

//         <div className="knowmore-grid">
//           <div className="knowmore-card">
//             <img src="https://cdn-icons-png.flaticon.com/512/942/942799.png" />
//             <h3>Verified Plans</h3>
//             <p>
//               Only IRDAI-approved and trusted insurance providers.
//             </p>
//           </div>

//           <div className="knowmore-card">
//             <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" />
//             <h3>Fast Claim Support</h3>
//             <p>
//               Step-by-step assistance so you never feel stuck.
//             </p>
//           </div>

//           <div className="knowmore-card">
//             <img src="https://cdn-icons-png.flaticon.com/512/868/868786.png" />
//             <h3>24×7 Assistance</h3>
//             <p>
//               Real humans ready to help you anytime.
//             </p>
//           </div>

//           <div className="knowmore-card">
//             <img src="https://cdn-icons-png.flaticon.com/512/1041/1041057.png" />
//             <h3>Secure & Transparent</h3>
//             <p>
//               No hidden clauses, no confusing terms.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* PROCESS */}
//       <section className="knowmore-process">
//         <h2>How It Works</h2>

//         <div className="process-steps">
//           <div className="step">
//             <span>1</span>
//             <p>Compare plans from top insurers</p>
//           </div>
//           <div className="step">
//             <span>2</span>
//             <p>Choose what fits your family</p>
//           </div>
//           <div className="step">
//             <span>3</span>
//             <p>Buy instantly & get support anytime</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="knowmore-cta">
//         <h2>Ready to Protect What Matters?</h2>
//         <p>Explore plans designed for every stage of life.</p>
//         <button>Explore Insurance Plans</button>
//       </section>

//     </div>
//   );
// };

// export default KnowMore;



import React from "react";
import "./KnowMore.css";

const KnowMore = () => {
  return (
    <div className="knowmore-page">

      {/* HERO */}
      <section className="knowmore-hero premium">
        <div className="hero-glass">
          <h1>Insurance That Actually Makes Sense</h1>
          <p>
            Transparent plans, honest guidance, and claim support you can
            actually rely on — built for Indian families.
          </p>
          <button className="primary-btn">Explore Insurance Plans</button>
        </div>
      </section>

      {/* STATS */}
      <section className="knowmore-stats">
        <div className="stat-card">
          <h2>1M+</h2>
          <p>Happy Customers</p>
        </div>
        <div className="stat-card">
          <h2>250+</h2>
          <p>Verified Plans</p>
        </div>
        <div className="stat-card">
          <h2>98%</h2>
          <p>Claim Success Rate</p>
        </div>
        <div className="stat-card">
          <h2>24×7</h2>
          <p>Expert Support</p>
        </div>
      </section>

      {/* WHY US */}
      <section className="knowmore-section">
        <h2>Why People Trust Us</h2>

        <div className="knowmore-grid">
          <div className="knowmore-card">
            <img src="https://cdn-icons-png.flaticon.com/512/942/942799.png" />
            <h3>IRDAI Approved</h3>
            <p>Only government-regulated & verified insurance plans.</p>
          </div>

          <div className="knowmore-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" />
            <h3>Zero Spam</h3>
            <p>No unwanted calls, no forced selling.</p>
          </div>

          <div className="knowmore-card">
            <img src="https://cdn-icons-png.flaticon.com/512/868/868786.png" />
            <h3>Human Support</h3>
            <p>Talk to real experts — not bots.</p>
          </div>

          <div className="knowmore-card">
            <img src="https://cdn-icons-png.flaticon.com/512/1041/1041057.png" />
            <h3>100% Transparency</h3>
            <p>Understand what you buy — clearly.</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="knowmore-timeline">
        <h2>How We Help You</h2>

        <div className="timeline">
          <div className="timeline-item">
            <span>01</span>
            <p>Compare plans across top insurers</p>
          </div>
          <div className="timeline-item">
            <span>02</span>
            <p>Understand benefits in simple language</p>
          </div>
          <div className="timeline-item">
            <span>03</span>
            <p>Buy securely with full documentation</p>
          </div>
          <div className="timeline-item">
            <span>04</span>
            <p>Get lifetime claim assistance</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="knowmore-testimonials">
        <h2>What Customers Say</h2>

        <div className="testimonial-grid">
          <div className="testimonial">
            <p>
              “Finally understood insurance without confusion. Claim support was
              smooth and fast.”
            </p>
            <h4>— Rahul, Delhi</h4>
          </div>

          <div className="testimonial">
            <p>
              “No spam calls, clear explanation, and genuine guidance.”
            </p>
            <h4>— Neha, Bangalore</h4>
          </div>

          <div className="testimonial">
            <p>
              “Felt more like financial advice than sales.”
            </p>
            <h4>— Amit, Mumbai</h4>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="knowmore-cta premium">
        <h2>Protect Your Family Today</h2>
        <p>Start comparing trusted insurance plans in minutes.</p>
        <button className="primary-btn">Get Started</button>
      </section>

    </div>
  );
};

export default KnowMore;
