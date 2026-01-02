
import React, { useState, useEffect } from "react";
import "./Calculator.css";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

const Calculator = () => {
  const [form, setForm] = useState({
    age: "",
    income: "",
    investment: "",
    premium: "",
    coverage: "",
    type: "life",
  });

  const [result, setResult] = useState(null);
  const [liveTip, setLiveTip] = useState("");

  // Input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Smart live tip updates
  useEffect(() => {
    if (!form.age || !form.income) return;
    const age = parseFloat(form.age);
    if (form.type === "life" && age > 50)
      setLiveTip("💡 Consider term insurance with short tenure due to higher age.");
    else if (form.type === "pension" && age < 30)
      setLiveTip("🎯 Early start! You’ll build a strong retirement corpus.");
    else if (form.type === "health")
      setLiveTip("🩺 Health cover of at least ₹5–10 lakh is recommended.");
    else if (form.type === "vehicle")
      setLiveTip("🚗 Comprehensive cover reduces out-of-pocket repairs.");
    else setLiveTip("");
  }, [form]);

  const calculateResult = () => {
    let output = {};
    const age = parseFloat(form.age);
    const income = parseFloat(form.income);
    const investment = parseFloat(form.investment);
    const premium = parseFloat(form.premium);
    const coverage = parseFloat(form.coverage);

    if (form.type === "life") {
      const recommended = income * 10 - investment;
      output = {
        title: "💖 Life Insurance Recommendation",
        message: `Recommended Life Cover: ₹${recommended.toLocaleString()}.`,
        yearly: (premium * 12).toLocaleString(),
        tip: "✅ Ideally, your life cover should be 10–15x your annual income.",
      };
    } else if (form.type === "health") {
      const healthPremium = (income * 0.02).toFixed(0);
      output = {
        title: "🩺 Health Insurance Suggestion",
        message: `Estimated yearly premium: ₹${healthPremium}`,
        yearly: healthPremium,
        tip: "🏥 Choose cashless hospitals and top-up cover options.",
      };
    } else if (form.type === "pension") {
      const retirementFund = (income * 12 * (65 - age) * 0.1).toFixed(0);
      output = {
        title: "💼 Retirement & Pension Estimate",
        message: `Saving 10% monthly gives ₹${retirementFund.toLocaleString()} by 65.`,
        tip: "📊 Increase savings by 2% yearly for compounding benefits.",
      };
    } else if (form.type === "vehicle") {
      const cost = (coverage * 0.03 + age * 20).toFixed(0);
      output = {
        title: "🚗 Vehicle Insurance Estimate",
        message: `Estimated yearly premium: ₹${cost}`,
        yearly: cost,
        tip: "⚡ Add zero-dep cover for new vehicles under 5 years.",
      };
    }

    setResult(output);
  };

  return (
    <motion.div
      className="calculator-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="calc-title">🧮 Premium Insurance & Pension Calculator</h1>
      <p className="calc-subtitle">
        Get real-time insights, recommendations & coverage estimates instantly.
      </p>

      <div className="calc-container">
        {/* Left Form Section */}
        <motion.div
          className="calc-form"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <label>
            Insurance Type <FaInfoCircle title="Select the type of policy you wish to calculate" />
          </label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="life">Life Insurance</option>
            <option value="health">Health Insurance</option>
            <option value="pension">Pension / Retirement</option>
            <option value="vehicle">Vehicle Insurance</option>
          </select>

          <label>
            Age <FaInfoCircle title="Your current age helps in risk and premium calculation" />
          </label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />

          <label>Annual Income (₹)</label>
          <input
            type="number"
            name="income"
            value={form.income}
            onChange={handleChange}
            placeholder="e.g. 600000"
          />

          <label>Existing Investment (₹)</label>
          <input
            type="number"
            name="investment"
            value={form.investment}
            onChange={handleChange}
            placeholder="e.g. 200000"
          />

          <label>Monthly Premium (₹)</label>
          <input
            type="number"
            name="premium"
            value={form.premium}
            onChange={handleChange}
            placeholder="e.g. 2500"
          />

          <label>Desired Coverage (₹)</label>
          <input
            type="number"
            name="coverage"
            value={form.coverage}
            onChange={handleChange}
            placeholder="e.g. 1000000"
          />

          {liveTip && <p className="live-tip">{liveTip}</p>}

          <motion.button whileHover={{ scale: 1.05 }} className="calc-btn" onClick={calculateResult}>
            Calculate Now 🚀
          </motion.button>
        </motion.div>

        {/* Right Result Section */}
        <motion.div
          className="calc-result"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {result ? (
            <motion.div
              className="result-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h2>{result.title}</h2>
              <p>{result.message}</p>
              {result.yearly && (
                <div className="result-highlight">
                  Yearly Payment: ₹{result.yearly}
                </div>
              )}
              <p className="result-tip">{result.tip}</p>
            </motion.div>
          ) : (
            <p className="placeholder-text">
              Enter your details to see your smart results 💡
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Calculator;
