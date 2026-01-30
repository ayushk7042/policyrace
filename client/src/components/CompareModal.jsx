
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
        {/* <div className="compare-table">
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
        </div> */}
<div className="compare-table">
  {compareList.map(policy => (
    <div key={policy._id} className="compare-card">
      <div className="compare-card-top">
        <img src={policy.imageUrl || policy.image} alt={policy.title} />
        <h3>{policy.title}</h3>
      </div>

      <p className="compare-desc">{policy.shortDescription}</p>

      <div className="compare-metrics">
        <p className={`compare-life ${getHighlightClass(
          policy.lifeCover,
          Math.max(...compareList.map(p => p.lifeCover))
        )}`}>
          Life Cover: ₹{policy.lifeCover}
        </p>

        <p className={`compare-price ${getHighlightClass(
          policy.priceOptions?.[0]?.price || 0,
          Math.min(...compareList.map(p => p.priceOptions?.[0]?.price || 0)),
          false
        )}`}>
          Price: ₹{policy.priceOptions?.[0]?.price || "N/A"}
        </p>

        <p className={`compare-claim ${getHighlightClass(
          policy.claimSettlement,
          Math.max(...compareList.map(p => p.claimSettlement))
        )}`}>
          Claim: {policy.claimSettlement}%
        </p>
      </div>

      <button className="compare-apply-btn">Apply Now</button>
    </div>
  ))}
</div>


      </div>
    </div>
  );
};

export default CompareModal;
