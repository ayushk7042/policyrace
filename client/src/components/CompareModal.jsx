// // import React from "react";
// // import "./comparemodal.css";

// // const CompareModal = ({ compareList, onClose }) => {
// //   if (compareList.length < 2) return null; // Kam se kam 2 policies compare karni chahiye

// //   return (
// //     <div className="compare-modal-backdrop">
// //       <div className="compare-modal">
// //         <button className="close-btn" onClick={onClose}>×</button>
// //         <h2>Compare Policies</h2>
// //         <div className="compare-grid">
// //           {compareList.map((p) => (
// //             <div key={p._id} className="compare-card">
// //               <img src={p.imageUrl || p.image} alt={p.title} />
// //               <h3>{p.title}</h3>
// //               <p>{p.shortDescription}</p>
// //               <ul>
// //                 <li><strong>Price:</strong> ₹{p.priceOptions?.[0]?.price || "N/A"}</li>
// //                 <li><strong>Life Cover:</strong> {p.lifeCover || "N/A"}</li>
// //                 <li><strong>Claim Settlement:</strong> {p.claimSettlement || "N/A"}%</li>
// //                 <li><strong>Term:</strong> {p.term || "N/A"} years</li>
// //               </ul>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CompareModal;
// import React from "react";
// import "./CompareModal.css";

// const CompareModal = ({ compareList, onClose }) => {
//   if (!compareList || compareList.length < 2) return null;

//   // Get all keys for comparison
//   const keys = ["title", "lifeCover", "claimSettlement", "priceOptions"];
  
//   return (
//     <div className="compare-modal-overlay">
//       <div className="compare-modal-container">
//         <div className="compare-modal-header">
//           <h2>Compare Policies</h2>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </div>
//         <div className="compare-modal-body">
//           {compareList.map((policy, idx) => (
//             <div key={policy._id} className="compare-card">
//               {policy.popular && <span className="badge popular">Popular</span>}
//               {policy.bestValue && <span className="badge best">Best Value</span>}
//               <img src={policy.imageUrl || policy.image} alt={policy.title} />
//               <h3>{policy.title}</h3>
//               <p>{policy.shortDescription}</p>
//               <div className="compare-details">
//                 <div><strong>Life Cover:</strong> {policy.lifeCover || "N/A"}</div>
//                 <div><strong>Claim Settlement:</strong> {policy.claimSettlement || "N/A"}%</div>
//                 <div><strong>Price:</strong> ₹{policy.priceOptions?.[0]?.price || "N/A"}</div>
//                 <div><strong>Tenure:</strong> {policy.priceOptions?.[0]?.tenure || "N/A"} years</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompareModal;
import React from "react";
import "./CompareModal.css";

const CompareModal = ({ compareList, onClose }) => {
  const getHighlightClass = (val1, val2, higherIsBetter = true) => {
    if (val1 === val2) return "";
    if (higherIsBetter) return val1 > val2 ? "best" : "worst";
    return val1 < val2 ? "best" : "worst";
  };

  return (
    <div className="compare-modal-overlay">
      <div className="compare-modal">
        <div className="compare-header">
          <h2>Compare Policies</h2>
          <button className="compare-close-btn" onClick={onClose}>X</button>
        </div>
        <div className="compare-table">
          {compareList.map(policy => (
            <div key={policy._id} className="compare-card">
              <img src={policy.imageUrl || policy.image} alt={policy.title} />
              <h3>{policy.title}</h3>
              <p>{policy.shortDescription}</p>
              <p className={`compare-life ${getHighlightClass(policy.lifeCover, Math.max(...compareList.map(p => p.lifeCover)))}`}>
                Life Cover: {policy.lifeCover}
              </p>
              <p className={`compare-price ${getHighlightClass(policy.priceOptions?.[0]?.price || 0, Math.min(...compareList.map(p => p.priceOptions?.[0]?.price || 0)), false)}`}>
                Price: ₹{policy.priceOptions?.[0]?.price || "N/A"}
              </p>
              <p className={`compare-claim ${getHighlightClass(policy.claimSettlement, Math.max(...compareList.map(p => p.claimSettlement)))}`}>
                Claim: {policy.claimSettlement}%
              </p>
              <button className="compare-apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
