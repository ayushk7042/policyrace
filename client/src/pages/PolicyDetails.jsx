



// // import React, { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import api from "../api/axios";
// // import "./PolicyDetails.css";

// // const PolicyDetails = () => {
// //   const { id } = useParams();
// //   const [policy, setPolicy] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [openQuiz, setOpenQuiz] = useState(null);
// //   const [openStep, setOpenStep] = useState({}); // for flowchart steps accordion

// //   useEffect(() => {
// //     const fetchPolicy = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await api.get(`/policies/${id}`);
// //         setPolicy(res.data.policy);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPolicy();
// //   }, [id]);

// //   if (loading) return <p className="policy-loading">Loading policy details...</p>;
// //   if (!policy) return <p className="policy-error">Policy not found.</p>;

// //   // Scroll to section helper
// //   const scrollTo = (id) => {
// //     const el = document.getElementById(id);
// //     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
// //   };

// //   return (
// //     <div className="policy-details-container">

// //       {/* BACK LINK */}
// //       <Link to="/" className="back-link">⬅️ Back to Homepage</Link>

// //       {/* FULL-WIDTH HEADER */}
// //       <header className="policy-header fade-in">
// //         <img src={policy.imageUrl} alt={policy.title} className="policy-image"/>
// //         <h1 className="gradient-text">{policy.title}</h1>
// //         <p className="policy-short-desc">{policy.shortDescription}</p>

// // <section className="policy-summary fade-in">
// //   {policy.lifeCover && <span className="badge">Life Cover: {policy.lifeCover}</span>}
// //   {policy.coverTillAge && <span className="badge">Cover Till Age: {policy.coverTillAge}</span>}
// //   {policy.claimSettlement && <span className="badge">Claim Settlement: {policy.claimSettlement}</span>}
// //   <span className="badge">{policy.refundOfPremium ? "Refund Available" : "No Refund"}</span>
// //   {policy.policyType && <span className="badge">Type: {policy.policyType}</span>}
// // </section>


// //         <div className="policy-badges">
// //           {policy.lifeCover && <span className="badge">Life Cover: {policy.lifeCover}</span>}
// //           {policy.coverTillAge && <span className="badge">Cover Till Age: {policy.coverTillAge}</span>}
// //           {policy.claimSettlement && <span className="badge">Claim Settlement: {policy.claimSettlement}</span>}
// //           <span className="badge">{policy.refundOfPremium ? "Refund Available" : "No Refund"}</span>
// //         </div>
// //       </header>





// //       <div className="policy-main-content">
// //         {/* LEFT CONTENT */}
// //         <div className="policy-left">

// //           {/* PLAN DETAILS */}
// //           {policy.planDetail && (
// //             <section className="policy-section fade-in" id="planDetails">
// //               <h2>📄 Plan Details</h2>
// //               {policy.planDetail.title && <h3>{policy.planDetail.title}</h3>}
// //               {policy.planDetail.flowchartImageUrl && (
// //                 <img src={policy.planDetail.flowchartImageUrl} alt="Flowchart" className="flowchart-image"/>
// //               )}
// //               {policy.planDetail.whatsCovered?.length > 0 && (
// //                 <div>
// //                   <h4>✅ What's Covered</h4>
// //                   <ul className="list-check">
// //                     {policy.planDetail.whatsCovered.map((item, idx) => (
// //                       <li key={idx}>{item}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //               {policy.planDetail.notCovered?.length > 0 && (
// //                 <div>
// //                   <h4>❌ Not Covered</h4>
// //                   <ul className="list-cross">
// //                     {policy.planDetail.notCovered.map((item, idx) => (
// //                       <li key={idx}>{item}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //               {policy.planDetail.working && (
// //                 <p><strong>Working:</strong> {policy.planDetail.working}</p>
// //               )}
// //               {policy.planDetail.flowchartSteps?.length > 0 && (
// //                 <div>
// //                   <h4>🔄 Flowchart Steps</h4>
// //                   <ul className="list-flow-steps">
// //                     {policy.planDetail.flowchartSteps.map((step, idx) => (
// //                       <li key={idx} onClick={() => setOpenStep({ ...openStep, [idx]: !openStep[idx] })}>
// //                         <strong>Age {step.fromAge} - {step.toAge}</strong> 
// //                         {openStep[idx] ? `: ${step.description}` : " (Click to expand)"}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </section>
// //           )}

// //           {/* ADD-ON BENEFITS */}
// //           {policy.addOnBenefits?.length > 0 && (
// //             <section className="policy-section fade-in" id="addOns">
// //               <h2>🎁 Add-On Benefits</h2>
// //               <div className="addons-grid">
// //                 {policy.addOnBenefits.map((add, idx) => (
// //                   <div key={idx} className="addon-card hover-effect">
// //                     {add.imageUrl && <img src={add.imageUrl} alt={add.title} />}
// //                     <h4>{add.title}</h4>
// //                     <p>{add.description}</p>
// //                     <span className={`badge ${add.isFree ? "free-badge" : ""}`}>{add.isFree ? "Free" : "Paid"}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </section>
// //           )}

// //           {/* ADVANTAGES */}
// //           {policy.advantages?.length > 0 && (
// //             <section className="policy-section fade-in" id="advantages">
// //               <h2>⭐ Advantages</h2>
// //               <ul className="list-star">
// //                 {policy.advantages.map((adv, idx) => (
// //                   <li key={idx}>{adv}</li>
// //                 ))}
// //               </ul>
// //             </section>
// //           )}

// //           {/* QUIZZES */}
// //           {policy.quizzes?.length > 0 && (
// //             <section className="policy-section fade-in" id="quizzes">
// //               <h2>❓ Quizzes</h2>
// //               {policy.quizzes.map((q, idx) => (
// //                 <div key={idx} className="quiz-card" onClick={() => setOpenQuiz(openQuiz === idx ? null : idx)}>
// //                   <p><strong>Q:</strong> {q.question}</p>
// //                   {openQuiz === idx && (
// //                     <ul className="quiz-options">
// //                       {q.options.map((opt, i) => (
// //                         <li key={i}>{opt}</li>
// //                       ))}
// //                     </ul>
// //                   )}
// //                 </div>
// //               ))}
// //             </section>
// //           )}

// //         </div>

// //         {/* RIGHT FLOATING PANEL */}
// //         <aside className="policy-right">
// //           <div className="sticky-panel fade-in">
// //             <h3>🧭 Quick Navigation</h3>
// //             <ul className="toc-list">
// //               {policy.planDetail && <li onClick={() => scrollTo("planDetails")}>Plan Details</li>}
// //               {policy.addOnBenefits?.length > 0 && <li onClick={() => scrollTo("addOns")}>Add-On Benefits</li>}
// //               {policy.advantages?.length > 0 && <li onClick={() => scrollTo("advantages")}>Advantages</li>}
// //               {policy.quizzes?.length > 0 && <li onClick={() => scrollTo("quizzes")}>Quizzes</li>}
// //               {policy.priceOptions?.length > 0 && <li onClick={() => scrollTo("pricing")}>Pricing</li>}
// //             </ul>

// //             {policy.priceOptions?.length > 0 && (
// //               <div id="pricing">
// //                 <h3>💰 Pricing Options</h3>
// //                 {policy.priceOptions.map((p, idx) => (
// //                   <div key={idx} className="price-card hover-effect">
// //                     <p><strong>Cycle:</strong> {p.billingCycle}</p>
// //                     <p><strong>Price:</strong> {p.price} {p.currency}</p>
// //                     {p.validTill && <p><strong>Valid Till:</strong> {new Date(p.validTill).toLocaleDateString()}</p>}
// //                     <button className="apply-btn">Apply Now</button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PolicyDetails;



// // src/pages/PolicyDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "../api/axios";
// import "./PolicyDetails.css";

// const PolicyDetails = () => {
//   const { id } = useParams();
//   const [policy, setPolicy] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuiz, setSelectedQuiz] = useState({});
//   const [showFlowStep, setShowFlowStep] = useState({});

//   useEffect(() => {
//     const fetchPolicy = async () => {
//       try {
//         const res = await api.get(`/policies/${id}`);
//         setPolicy(res.data.policy);
//       } catch (err) {
//         console.error("Error fetching policy", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPolicy();
//   }, [id]);

//   if (loading) return <p className="policy-loading">Loading policy details...</p>;
//   if (!policy) return <p className="policy-error">Policy not found.</p>;

//   const toggleStep = (i) =>
//     setShowFlowStep((prev) => ({ ...prev, [i]: !prev[i] }));

//   const handleQuizSelect = (quizId, optionIndex) => {
//     setSelectedQuiz((prev) => ({ ...prev, [quizId]: optionIndex }));
//   };

//   return (
//     <div className="policy-details-container fade-in">
//       {/* Back Link */}
//       <div className="policy-nav">
//         <Link to="/" className="back-link">⬅️ Back to Homepage</Link>
//       </div>

// {/* Sticky Summary Bar */}
// <div className="sticky-summary">
//   <h3>{policy.title}</h3>
//   <p>{policy.policyType} Insurance</p>
//   <a
//     href="https://affalliances.com"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="summary-btn"
//   >
//     Apply Now
//   </a>
// </div>







//       {/* Header Section */}
//       <header className="policy-header">
//         <img src={policy.imageUrl} alt={policy.title} className="policy-image" />
//         <h1 className="gradient-text">{policy.title}</h1>
//         <p className="policy-short-desc">{policy.shortDescription}</p>

//         <div className="policy-tags">
//           {policy.lifeCover && <span className="tag">💰 Life Cover: {policy.lifeCover}</span>}
//           {policy.coverTillAge && <span className="tag">🎯 Cover Till Age: {policy.coverTillAge}</span>}
//           {policy.claimSettlement && <span className="tag">🧾 Claim: {policy.claimSettlement}</span>}
//           <span className="tag">{policy.refundOfPremium ? "Refund Available" : "No Refund"}</span>
//           <span className="tag">📄 Type: {policy.policyType}</span>
//         </div>
//       </header>



// {/* Quick Highlights */}
// <section className="policy-highlights fade-in">
//   <h2>🌈 Key Highlights</h2>
//   <div className="highlight-grid">
//     <div className="highlight-card">
//       <h4>💰 Sum Assured</h4>
//       <p>{policy.lifeCover || "N/A"}</p>
//     </div>
//     <div className="highlight-card">
//       <h4>📆 Policy Term</h4>
//       <p>{policy.coverTillAge ? `Till Age ${policy.coverTillAge}` : "Flexible"}</p>
//     </div>
//     <div className="highlight-card">
//       <h4>🧾 Claim Ratio</h4>
//       <p>{policy.claimSettlement || "Not Available"}</p>
//     </div>
//   </div>
// </section>




// {/* PLAN DETAILS - REDESIGNED */}
// {policy.planDetail && (
//   <section className="policy-section plan-details fade-in">
//     <div className="plan-header">
//       <h2>📋 {policy.planDetail.title || "Plan Details"}</h2>
//       <p className="plan-subtext">
//         Explore the complete breakdown of this plan, including its benefits, exclusions, and step-by-step coverage process.
//       </p>
//     </div>

//     {/* Working Section */}
//     {policy.planDetail.working && (
//       <div className="plan-working">
//         <h3>⚙️ How It Works</h3>
//         <p>{policy.planDetail.working}</p>
//       </div>
//     )}

//     {/* Flowchart Image */}
//     {policy.planDetail.flowchartImageUrl && (
//       <div className="plan-flowchart-image">
//         <img
//           src={policy.planDetail.flowchartImageUrl}
//           alt="Flowchart"
//           className="flowchart-image"
//         />
//       </div>
//     )}

//     {/* Coverage Comparison Cards */}
//     <div className="coverage-container">
//       {/* What's Covered */}
//       {policy.planDetail.whatsCovered?.length > 0 && (
//         <div className="coverage-card covered">
//           <h4>✅ What’s Covered</h4>
//           <ul>
//             {policy.planDetail.whatsCovered.map((item, i) => (
//               <li key={i}>✔️ {item}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Not Covered */}
//       {policy.planDetail.notCovered?.length > 0 && (
//         <div className="coverage-card not-covered">
//           <h4>🚫 Not Covered</h4>
//           <ul>
//             {policy.planDetail.notCovered.map((item, i) => (
//               <li key={i}>❌ {item}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>

//     {/* Flowchart Steps */}
//     {policy.planDetail.flowchartSteps?.length > 0 && (
//       <div className="flowchart-section">
//         <h3>🧩 Step-by-Step Coverage Flow</h3>
//         {policy.planDetail.flowchartSteps.map((step, i) => (
//           <div key={i} className="flow-step-card">
//             <div
//               className={`step-header ${showFlowStep[i] ? "open" : ""}`}
//               onClick={() => toggleStep(i)}
//             >
//               <span>{showFlowStep[i] ? "▼" : "▶"}</span>
//               <strong>
//                 Step {i + 1}: Age {step.fromAge} - {step.toAge}
//               </strong>
//             </div>
//             {showFlowStep[i] && (
//               <p className="step-description">{step.description}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     )}

//     {/* CTA Buttons */}
//     <div className="plan-actions">
//       <a
//         href="https://affalliances.com"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="btn-apply"
//       >
//         🚀 Apply for This Plan
//       </a>
//       <button className="btn-learn" onClick={() => alert("More details coming soon!")}>
//         📘 Learn More
//       </button>
//     </div>
//   </section>
// )}



     

//         {/* FREE ADD-ONS */}
//         {policy.freeAddOns?.length > 0 && (
//           <section className="policy-section fade-in">
//             <h2>🎁 Free Add-Ons</h2>
//             <div className="card-grid">
//               {policy.freeAddOns.map((add, i) => (
//                 <div key={i} className="card-item">
//                   {add.imageUrl && <img src={add.imageUrl} alt={add.title} />}
//                   <h4>{add.title}</h4>
//                   <p>{add.description}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* ADD-ON BENEFITS */}
//         {policy.addOnBenefits?.length > 0 && (
//           <section className="policy-section fade-in">
//             <h2>💼 Add-On Benefits</h2>
//             <div className="card-grid">
//               {policy.addOnBenefits.map((add, i) => (
//                 <div key={i} className="card-item">
//                   {add.imageUrl && <img src={add.imageUrl} alt={add.title} />}
//                   <h4>{add.title}</h4>
//                   <p>{add.description}</p>
//                   <span className={add.isFree ? "tag free" : "tag paid"}>
//                     {add.isFree ? "Free" : "Paid"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* ADVANTAGES */}
//         {policy.advantages?.length > 0 && (
//           <section className="policy-section fade-in">
//             <h2>⭐ Advantages</h2>
//             <ul className="advantage-list">
//               {policy.advantages.map((adv, i) => (
//                 <li key={i}>✅ {adv}</li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {/* QUIZZES */}
//         {/* {policy.quizzes?.length > 0 && (
//           <section className="policy-section fade-in">
//             <h2>🧠 Policy Quiz</h2>
//             {policy.quizzes.map((quiz) => (
//               <div key={quiz._id} className="quiz-box">
//                 <h4>{quiz.question}</h4>
//                 <div className="quiz-options">
//                   {quiz.options.map((opt, i) => (
//                     <button
//                       key={i}
//                       className={`quiz-option ${
//                         selectedQuiz[quiz._id] === i ? "selected" : ""
//                       }`}
//                       onClick={() => handleQuizSelect(quiz._id, i)}
//                     >
//                       {opt}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </section>
//         )} */}


// {/* QUIZZES – Redesigned */}
// {policy.quizzes?.length > 0 && (
//   <section className="policy-section fade-in quiz-section">
//     <h2>🧠 Test Your Insurance Knowledge</h2>
//     <p className="quiz-intro">
//       Answer a few quick questions to check how well you understand this policy.
//     </p>

//     <div className="quiz-container">
//       {policy.quizzes.map((quiz, index) => (
//         <div key={quiz._id} className="quiz-card">
//           <div className="quiz-header">
//             <span className="quiz-number">Question {index + 1}</span>
//             <h4>{quiz.question}</h4>
//           </div>

//           <div className="quiz-options-grid">
//             {quiz.options.map((opt, i) => (
//               <button
//                 key={i}
//                 className={`quiz-option-btn ${
//                   selectedQuiz[quiz._id] === i ? "active" : ""
//                 }`}
//                 onClick={() => handleQuizSelect(quiz._id, i)}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>

//     <div className="quiz-footer">
//       <p>🟣 You have answered {Object.keys(selectedQuiz).length} of {policy.quizzes.length} questions</p>
//       <a
//         href="https://affalliances.com"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="quiz-apply-btn"
//       >
//         🚀 Apply After Quiz
//       </a>
//     </div>
//   </section>
// )}




//         {/* PRICE OPTIONS */}
//         {policy.priceOptions?.length > 0 && (
//           <section className="policy-section fade-in">
//             <h2>💰 Price Options</h2>
//             <div className="price-grid">
//               {policy.priceOptions.map((p, i) => (
//                 <div key={i} className="price-card">
//                   <h4>{p.billingCycle.toUpperCase()}</h4>
//                   <p className="price-amt">
//                     {p.currency} {p.price}
//                   </p>
//                   {p.validTill && (
//                     <p className="valid-till">
//                       Valid Till: {new Date(p.validTill).toLocaleDateString()}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}



// {/* Dynamic Progress Bar */}
// <div className="progress-bar-container">
//   <div
//     className="progress-bar-fill"
//     style={{ width: `${Math.min(
//       ((policy.priceOptions?.length ? 1 : 0) +
//         (policy.addOnBenefits?.length ? 1 : 0) +
//         (policy.freeAddOns?.length ? 1 : 0) +
//         (policy.planDetail ? 1 : 0)) *
//         25,
//       100
//     )}%` }}
//   ></div>
// </div>





//         {/* INSURANCE TYPE SPECIFIC DETAILS */}
//         <section className="policy-section fade-in">
//           <h2>🏷️ Insurance Type Details</h2>
//           {policy.policyType === "Car" && (
//             <ul className="detail-list">
//               <li>🚗 Vehicle Model: {policy.vehicleModel}</li>
//               <li>🔢 Registration Number: {policy.registrationNumber}</li>
//             </ul>
//           )}
//           {policy.policyType === "Health" && (
//             <ul className="detail-list">
//               <li>🏥 Conditions: {policy.preExistingConditions}</li>
//               <li>🏨 Hospital Network: {policy.hospitalNetwork}</li>
//             </ul>
//           )}
//           {policy.policyType === "Travel" && (
//             <ul className="detail-list">
//               <li>✈️ Trip Duration: {policy.tripDuration}</li>
//               <li>🌍 Destination: {policy.destination}</li>
//             </ul>
//           )}
//           {policy.policyType === "Home" && (
//             <ul className="detail-list">
//               <li>🏠 Property Type: {policy.propertyType}</li>
//               <li>💵 Property Value: {policy.propertyValue}</li>
//             </ul>
//           )}
//         </section>


// {/* Testimonials Section */}
// <section className="policy-section fade-in">
//   <h2>💬 What Our Customers Say</h2>
//   <div className="testimonial-grid">
//     <div className="testimonial-card">
//       <p>"Excellent coverage and quick claim process!"</p>
//       <span>- Riya Sharma</span>
//     </div>
//     <div className="testimonial-card">
//       <p>"Affordable premium and great customer support."</p>
//       <span>- Aarav Mehta</span>
//     </div>
//   </div>
// </section>




//         {/* APPLY BUTTON SECTION */}
// <div className="apply-section fade-in">
//   <a
//     href="https://affalliances.com"
//     target="_blank"
//     rel="noopener noreferrer"
//     className="apply-btn"
//   >
//     🚀 Apply Now on Affalliances
//   </a>
// </div>

//       </div>
//     </div>
//   );
// };

// export default PolicyDetails;





import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "./PolicyDetails.css";

const PolicyDetails = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [showFlowStep, setShowFlowStep] = useState({});

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await api.get(`/policies/${id}`);
        setPolicy(res.data.policy);
      } catch (err) {
        console.error("Error fetching policy", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, [id]);

  const toggleStep = (i) =>
    setShowFlowStep((prev) => ({ ...prev, [i]: !prev[i] }));

  const handleQuizSelect = (quizId, optionIndex) => {
    setSelectedQuiz((prev) => ({ ...prev, [quizId]: optionIndex }));
  };

  if (loading) return <p className="policy-loading">Loading policy details...</p>;
  if (!policy) return <p className="policy-error">Policy not found.</p>;

  return (
    <div className="policy-details-container fade-in">
      {/* Back Link */}
      <div className="policy-nav">
        <Link to="/" className="back-link">⬅️ Back to Homepage</Link>
      </div>

      {/* Sticky Summary Bar */}
      <div className="sticky-summary">
        <h3>{policy.title}</h3>
        <p>{policy.policyType} Insurance</p>
        <a
          href="https://affalliances.com"
          target="_blank"
          rel="noopener noreferrer"
          className="summary-btn"
        >
          Apply Now
        </a>
      </div>

      {/* Quick Navigation */}
      <div className="quick-nav">
        <a href="#plan-details">📋 Plan</a>
        <a href="#addons">🎁 Add-Ons</a>
        <a href="#quiz">🧠 Quiz</a>
        <a href="#price">💰 Price</a>
        <a href="#reviews">💬 Reviews</a>
      </div>

      {/* Header Section */}
      <header className="policy-header">
        <img src={policy.imageUrl} alt={policy.title} className="policy-image" />
        <h1 className="gradient-text">{policy.title}</h1>
        <p className="policy-short-desc">{policy.shortDescription}</p>

        <div className="policy-tags">
          {policy.lifeCover && <span className="tag">💰 Life Cover: {policy.lifeCover}</span>}
          {policy.coverTillAge && <span className="tag">🎯 Cover Till Age: {policy.coverTillAge}</span>}
          {policy.claimSettlement && <span className="tag">🧾 Claim: {policy.claimSettlement}</span>}
          <span className="tag">{policy.refundOfPremium ? "Refund Available" : "No Refund"}</span>
          <span className="tag">📄 Type: {policy.policyType}</span>
        </div>
      </header>

      {/* Quick Highlights */}
      <section className="policy-highlights fade-in">
        <h2>🌈 Key Highlights</h2>
        <div className="highlight-grid">
          <div className="highlight-card">
            <h4>💰 Sum Assured</h4>
            <p>{policy.lifeCover || "N/A"}</p>
          </div>
          <div className="highlight-card">
            <h4>📆 Policy Term</h4>
            <p>{policy.coverTillAge ? `Till Age ${policy.coverTillAge}` : "Flexible"}</p>
          </div>
          <div className="highlight-card">
            <h4>🧾 Claim Ratio</h4>
            <p>{policy.claimSettlement || "Not Available"}</p>
          </div>
        </div>
      </section>

      {/* PLAN DETAILS - Enhanced */}
      {policy.planDetail && (
        <section id="plan-details" className="policy-section plan-details fade-in">
          <div className="plan-header">
            <h2>📋 {policy.planDetail.title || "Plan Details"}</h2>
            <p className="plan-subtext">
              Explore the complete breakdown of this plan, including its benefits, exclusions, and step-by-step coverage process.
            </p>
          </div>

          {/* Working Section */}
          {policy.planDetail.working && (
            <div className="plan-working">
              <h3>⚙️ How It Works</h3>
              <p>{policy.planDetail.working}</p>
            </div>
          )}

          {/* Flowchart Image */}
          {policy.planDetail.flowchartImageUrl && (
            <div className="plan-flowchart-image">
              <img
                src={policy.planDetail.flowchartImageUrl}
                alt="Flowchart"
                className="flowchart-image"
              />
            </div>
          )}

          {/* Coverage Comparison Cards */}
          <div className="coverage-container">
            {/* What's Covered */}
            {policy.planDetail.whatsCovered?.length > 0 && (
              <div className="coverage-card covered">
                <h4>✅ What’s Covered</h4>
                <ul>
                  {policy.planDetail.whatsCovered.map((item, i) => (
                    <li key={i}>✔️ {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Not Covered */}
            {policy.planDetail.notCovered?.length > 0 && (
              <div className="coverage-card not-covered">
                <h4>🚫 Not Covered</h4>
                <ul>
                  {policy.planDetail.notCovered.map((item, i) => (
                    <li key={i}>❌ {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Flowchart Steps */}
          {policy.planDetail.flowchartSteps?.length > 0 && (
            <div className="flowchart-section">
              <h3>🧩 Step-by-Step Coverage Flow</h3>
              {policy.planDetail.flowchartSteps.map((step, i) => (
                <div key={i} className="flow-step-card">
                  <div
                    className={`step-header ${showFlowStep[i] ? "open" : ""}`}
                    onClick={() => toggleStep(i)}
                  >
                    <span>{showFlowStep[i] ? "▼" : "▶"}</span>
                    <strong>
                      Step {i + 1}: Age {step.fromAge} - {step.toAge}
                    </strong>
                  </div>
                  {showFlowStep[i] && (
                    <div className="step-progress">
                      <p>{step.description}</p>
                      <div className="progress-track">
                        <div className="progress-dot"></div>
                        <div className="progress-line"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="plan-actions">
            <a
              href="https://affalliances.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apply"
            >
              🚀 Apply for This Plan
            </a>
            <button className="btn-learn" onClick={() => alert("More details coming soon!")}>
              📘 Learn More
            </button>
          </div>
        </section>
      )}

      {/* Free Add-Ons */}
      {policy.freeAddOns?.length > 0 && (
        <section id="addons" className="policy-section fade-in">
          <h2>🎁 Free Add-Ons</h2>
          <div className="card-grid">
            {policy.freeAddOns.map((add, i) => (
              <div key={i} className="card-item">
                {add.imageUrl && <img src={add.imageUrl} alt={add.title} />}
                <h4>{add.title}</h4>
                <p>{add.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quiz Section */}
      {policy.quizzes?.length > 0 && (
        <section id="quiz" className="policy-section fade-in quiz-section">
          <h2>🧠 Test Your Insurance Knowledge</h2>
          <p className="quiz-intro">
            Answer a few quick questions to check how well you understand this policy.
          </p>

          <div className="quiz-container">
            {policy.quizzes.map((quiz, index) => (
              <div key={quiz._id} className="quiz-card">
                <div className="quiz-header">
                  <span className="quiz-number">Question {index + 1}</span>
                  <h4>{quiz.question}</h4>
                </div>

                <div className="quiz-options-grid">
                  {quiz.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`quiz-option-btn ${
                        selectedQuiz[quiz._id] === i ? "active" : ""
                      }`}
                      onClick={() => handleQuizSelect(quiz._id, i)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="quiz-footer">
            <p>🟣 You have answered {Object.keys(selectedQuiz).length} of {policy.quizzes.length} questions</p>
            <a
              href="https://affalliances.com"
              target="_blank"
              rel="noopener noreferrer"
              className="quiz-apply-btn"
            >
              🚀 Apply After Quiz
            </a>
          </div>
        </section>
      )}

      {/* AI Smart Suggestion */}
      <section className="policy-section fade-in ai-suggest">
        <h2>🤖 Smart Suggestion</h2>
        <p>
          Based on your responses and selected policy type, our AI recommends the most optimized coverage plan for you.
        </p>
        <div className="ai-card">
          <h4>💡 Suggested Plan: <span>{policy.title}</span></h4>
          <p>Includes {policy.addOnBenefits?.length || 0} add-ons & {policy.freeAddOns?.length || 0} free features.</p>
          <button className="ai-btn">View Personalized Plan</button>
        </div>
      </section>

      {/* Price Options */}
      {policy.priceOptions?.length > 0 && (
        <section id="price" className="policy-section fade-in">
          <h2>💰 Price Options</h2>
          <div className="price-grid">
            {policy.priceOptions.map((p, i) => (
              <div key={i} className="price-card">
                <h4>{p.billingCycle.toUpperCase()}</h4>
                <p className="price-amt">
                  {p.currency} {p.price}
                </p>
                {p.validTill && (
                  <p className="valid-till">
                    Valid Till: {new Date(p.validTill).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section id="reviews" className="policy-section fade-in">
        <h2>💬 What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"Excellent coverage and quick claim process!"</p>
            <span>- Riya Sharma</span>
          </div>
          <div className="testimonial-card">
            <p>"Affordable premium and great customer support."</p>
            <span>- Aarav Mehta</span>
          </div>
        </div>
      </section>

      {/* Final Apply Button */}
      <div className="apply-section fade-in">
        <a
          href="https://affalliances.com"
          target="_blank"
          rel="noopener noreferrer"
          className="apply-btn"
        >
          🚀 Apply Now on Affalliances
        </a>
      </div>
    </div>
  );
};

export default PolicyDetails;
