import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./FAQ.css";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await api.get("/faqs"); // Backend endpoint
        setFaqs(res.data.faqs || []);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <p className="faq-loading">Loading FAQs...</p>;

  return (
    <div className="faq-page">
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to the most common questions about our insurance services.</p>
      </header>

      <section className="faq-container">
        {faqs.length === 0 ? (
          <p className="no-faq">No FAQs found.</p>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={faq._id}
              className={`faq-card ${activeIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className="toggle-icon">{activeIndex === index ? "−" : "+"}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default FAQ;
