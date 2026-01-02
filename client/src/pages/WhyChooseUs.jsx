import React from "react";
import "./WhyChooseUs.css";

const data = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
    title: "Best Prices Guaranteed",
    desc: "Compare policies across insurers and get the best premium instantly.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    title: "Unbiased Expert Advice",
    desc: "Our advisors work for you — not insurance companies.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/942/942799.png",
    title: "100% Secure & IRDAI Approved",
    desc: "Every policy is verified and government regulated.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    title: "Fast & Hassle-Free Claims",
    desc: "Dedicated claim assistance till settlement.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/868/868786.png",
    title: "Always-On Support",
    desc: "Our team is available 7 days a week for you.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2910/2910762.png",
    title: "Exclusive Deals",
    desc: "Special discounts only for our customers.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3103/3103446.png",
    title: "Simple & Fast Process",
    desc: "Buy insurance in minutes with minimal paperwork.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/476/476863.png",
    title: "Trusted by Millions",
    desc: "Over 5M+ families trust us for their protection.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="why-page">

      {/* HERO */}
      <section className="why-hero">
        <h1>Why Millions Choose Us</h1>
        <p>
          We don’t just sell insurance — we help you make the right decision
          with confidence.
        </p>
      </section>

      {/* GRID */}
      <section className="why-grid-section">
        <div className="why-grid">
          {data.map((item, i) => (
            <div className="why-card" key={i}>
              <img src={item.icon} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div>
          <h2>5M+</h2>
          <p>Happy Customers</p>
        </div>
        <div>
          <h2>98%</h2>
          <p>Claim Success Rate</p>
        </div>
        <div>
          <h2>250+</h2>
          <p>Insurance Plans</p>
        </div>
      </section>

      {/* CTA */}
      <section className="why-cta">
        <h2>Ready to Protect Your Future?</h2>
        <p>Compare trusted insurance plans in minutes.</p>
        <button className="cta-btn">Get Started</button>
      </section>

    </div>
  );
};

export default WhyChooseUs;
