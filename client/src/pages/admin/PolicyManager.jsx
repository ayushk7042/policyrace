

// src/pages/admin/PolicyManager.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import "./PolicyManager.css";

const PolicyManager = () => {
  const { admin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const initialForm = {
    //
    policyType: "Normal", // default type

    title: "",
    imageUrl: "",
    shortDescription: "",
    lifeCover: "",
    coverTillAge: "",
    claimSettlement: "",
    refundOfPremium: false,
    freeAddOns: [],
    planDetail: {
      title: "",
      whatsCovered: [],
      notCovered: [],
      working: "",
      flowchartSteps: [],
      flowchartImageUrl: "",
    },
    addOnBenefits: [],
    advantages: [],
    quizzes: [],
    priceOptions: [],

     // insurance-specific fields
    vehicleModel: "",
    registrationNumber: "",
    preExistingConditions: "",
    hospitalNetwork: "",
    tripDuration: "",
    destination: "",
    propertyType: "",
    propertyValue: "",
  };

  const [form, setForm] = useState(initialForm);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) fetchPolicies(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchPolicies = async (categoryId) => {
    if (!categoryId) {
      setPolicies([]);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/policies?category=${categoryId}`);
      setPolicies(res.data.policies || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = (key, newItem) =>
    setForm((prev) => ({ ...prev, [key]: [...prev[key], newItem] }));

  const removeItem = (key, index) =>
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));

  const addNestedItem = (parentKey, newItem) => {
    setForm((prev) => ({
      ...prev,
      [parentKey]: [...prev[parentKey], newItem],
    }));
  };

  const removeNestedItem = (parentKey, index) =>
    setForm((prev) => ({
      ...prev,
      [parentKey]: prev[parentKey].filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, category: selectedCategory };
      if (editId) {
        await api.put(`/policies/${editId}`, payload, { headers });
      } else {
        await api.post("/policies", payload, { headers });
      }
      alert("✅ Policy saved!");
      setEditId(null);
      setForm(initialForm);
      fetchPolicies(selectedCategory);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving policy");
    }
  };

  const handleEdit = (policy) => {
    setEditId(policy._id);
    setForm(policy);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this policy?")) {
      await api.delete(`/policies/${id}`, { headers });
      fetchPolicies(selectedCategory);
    }
  };

  if (!admin) {
    return (
      <div className="no-access">
        <p>⛔ Access Denied. Please log in as Admin.</p>
        <button onClick={() => navigate("/admin/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="policy-manager-container">
      <header className="policy-header">
        <h1>📜 Policy Management</h1>
        <div>
          <button onClick={() => navigate("/admin/dashboard")}>⬅️ Dashboard</button>
          <Link to="/">🌐 Homepage</Link>
        </div>
      </header>

      {/* Category Selection */}
      <section className="policy-select">
        <h2>1️⃣ Select Category</h2>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </section>

      {selectedCategory && (
        <>
          <section className="policy-form-section">
            <h2>{editId ? "✏️ Edit Policy" : "➕ Add New Policy"}</h2>
            <form onSubmit={handleSubmit}>
              {/* Basic Info */}
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
              <textarea
                placeholder="Short Description"
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({ ...form, shortDescription: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Life Cover"
                value={form.lifeCover}
                onChange={(e) => setForm({ ...form, lifeCover: e.target.value })}
              />
              <input
                type="text"
                placeholder="Cover Till Age"
                value={form.coverTillAge}
                onChange={(e) =>
                  setForm({ ...form, coverTillAge: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Claim Settlement"
                value={form.claimSettlement}
                onChange={(e) =>
                  setForm({ ...form, claimSettlement: e.target.value })
                }
              />
              <label>
                <input
                  type="checkbox"
                  checked={form.refundOfPremium}
                  onChange={(e) =>
                    setForm({ ...form, refundOfPremium: e.target.checked })
                  }
                />
                Refund of Premium
              </label>

{/* Policy Type */}
<label>
  Policy Type:
  <select
    value={form.policyType}
    onChange={(e) => setForm({ ...form, policyType: e.target.value })}
    required
  >
    <option value="Normal">Normal</option>
    <option value="Car">Car Insurance</option>
    <option value="Health">Health Insurance</option>
    <option value="Travel">Travel Insurance</option>
    <option value="Home">Home Insurance</option>
  </select>
</label>

{/* Insurance-specific fields */}
{form.policyType === "Car" && (
  <div className="sub-section">
    <h4>🚗 Car Insurance Details</h4>
    <input
      placeholder="Vehicle Model"
      value={form.vehicleModel || ""}
      onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
    />
    <input
      placeholder="Registration Number"
      value={form.registrationNumber || ""}
      onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
    />
  </div>
)}

{form.policyType === "Health" && (
  <div className="sub-section">
    <h4>🏥 Health Insurance Details</h4>
    <input
      placeholder="Pre-existing Conditions"
      value={form.preExistingConditions || ""}
      onChange={(e) => setForm({ ...form, preExistingConditions: e.target.value })}
    />
    <input
      placeholder="Hospital Network"
      value={form.hospitalNetwork || ""}
      onChange={(e) => setForm({ ...form, hospitalNetwork: e.target.value })}
    />
  </div>
)}

{form.policyType === "Travel" && (
  <div className="sub-section">
    <h4>✈️ Travel Insurance Details</h4>
    <input
      placeholder="Trip Duration"
      value={form.tripDuration || ""}
      onChange={(e) => setForm({ ...form, tripDuration: e.target.value })}
    />
    <input
      placeholder="Destination"
      value={form.destination || ""}
      onChange={(e) => setForm({ ...form, destination: e.target.value })}
    />
  </div>
)}

{form.policyType === "Home" && (
  <div className="sub-section">
    <h4>🏠 Home Insurance Details</h4>
    <input
      placeholder="Property Type"
      value={form.propertyType || ""}
      onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
    />
    <input
      placeholder="Property Value"
      value={form.propertyValue || ""}
      onChange={(e) => setForm({ ...form, propertyValue: e.target.value })}
    />
  </div>
)}



              {/* Free Add-ons */}
              <div className="sub-section">
                <h3>🎁 Free Add-ons</h3>
                {form.freeAddOns.map((add, i) => (
                  <div key={i} className="nested-item">
                    <input
                      placeholder="Title"
                      value={add.title}
                      onChange={(e) => {
                        const newArr = [...form.freeAddOns];
                        newArr[i].title = e.target.value;
                        setForm({ ...form, freeAddOns: newArr });
                      }}
                    />
                    <input
                      placeholder="Image URL"
                      value={add.imageUrl}
                      onChange={(e) => {
                        const newArr = [...form.freeAddOns];
                        newArr[i].imageUrl = e.target.value;
                        setForm({ ...form, freeAddOns: newArr });
                      }}
                    />
                    <input
                      placeholder="Description"
                      value={add.description}
                      onChange={(e) => {
                        const newArr = [...form.freeAddOns];
                        newArr[i].description = e.target.value;
                        setForm({ ...form, freeAddOns: newArr });
                      }}
                    />
                    <button type="button" onClick={() => removeItem("freeAddOns", i)}>❌</button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addItem("freeAddOns", { title: "", imageUrl: "", description: "", isFree: true })
                  }
                >
                  ➕ Add Free Add-on
                </button>
              </div>

              {/* Plan Detail */}
              <div className="sub-section">
                <h3>📄 Plan Details</h3>
                <input
                  placeholder="Plan Title"
                  value={form.planDetail.title}
                  onChange={(e) =>
                    setForm({ ...form, planDetail: { ...form.planDetail, title: e.target.value } })
                  }
                />
                <input
                  placeholder="Flowchart Image URL"
                  value={form.planDetail.flowchartImageUrl}
                  onChange={(e) =>
                    setForm({ ...form, planDetail: { ...form.planDetail, flowchartImageUrl: e.target.value } })
                  }
                />
                <h4>✅ Whats Covered</h4>
                {form.planDetail.whatsCovered.map((item, i) => (
                  <div key={i}>
                    <input
                      value={item}
                      onChange={(e) => {
                        const newArr = [...form.planDetail.whatsCovered];
                        newArr[i] = e.target.value;
                        setForm({ ...form, planDetail: { ...form.planDetail, whatsCovered: newArr } });
                      }}
                    />
                    <button type="button" onClick={() => {
                      const newArr = form.planDetail.whatsCovered.filter((_, idx) => idx !== i);
                      setForm({ ...form, planDetail: { ...form.planDetail, whatsCovered: newArr } });
                    }}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => setForm({ ...form, planDetail: { ...form.planDetail, whatsCovered: [...form.planDetail.whatsCovered, ""] } })}>➕ Add Covered Item</button>

                <h4>❌ Not Covered</h4>
                {form.planDetail.notCovered.map((item, i) => (
                  <div key={i}>
                    <input
                      value={item}
                      onChange={(e) => {
                        const newArr = [...form.planDetail.notCovered];
                        newArr[i] = e.target.value;
                        setForm({ ...form, planDetail: { ...form.planDetail, notCovered: newArr } });
                      }}
                    />
                    <button type="button" onClick={() => {
                      const newArr = form.planDetail.notCovered.filter((_, idx) => idx !== i);
                      setForm({ ...form, planDetail: { ...form.planDetail, notCovered: newArr } });
                    }}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => setForm({ ...form, planDetail: { ...form.planDetail, notCovered: [...form.planDetail.notCovered, ""] } })}>➕ Add Not Covered Item</button>

                <input
                  placeholder="Working description"
                  value={form.planDetail.working}
                  onChange={(e) =>
                    setForm({ ...form, planDetail: { ...form.planDetail, working: e.target.value } })
                  }
                />

                <h4>Flowchart Steps</h4>
                {form.planDetail.flowchartSteps.map((step, i) => (
                  <div key={i}>
                    <input
                      placeholder="From Age"
                      type="number"
                      value={step.fromAge}
                      onChange={(e) => {
                        const newArr = [...form.planDetail.flowchartSteps];
                        newArr[i].fromAge = e.target.value;
                        setForm({ ...form, planDetail: { ...form.planDetail, flowchartSteps: newArr } });
                      }}
                    />
                    <input
                      placeholder="To Age"
                      type="number"
                      value={step.toAge}
                      onChange={(e) => {
                        const newArr = [...form.planDetail.flowchartSteps];
                        newArr[i].toAge = e.target.value;
                        setForm({ ...form, planDetail: { ...form.planDetail, flowchartSteps: newArr } });
                      }}
                    />
                    <input
                      placeholder="Description"
                      value={step.description}
                      onChange={(e) => {
                        const newArr = [...form.planDetail.flowchartSteps];
                        newArr[i].description = e.target.value;
                        setForm({ ...form, planDetail: { ...form.planDetail, flowchartSteps: newArr } });
                      }}
                    />
                    <button type="button" onClick={() => {
                      const newArr = form.planDetail.flowchartSteps.filter((_, idx) => idx !== i);
                      setForm({ ...form, planDetail: { ...form.planDetail, flowchartSteps: newArr } });
                    }}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => setForm({ ...form, planDetail: { ...form.planDetail, flowchartSteps: [...form.planDetail.flowchartSteps, { fromAge: 0, toAge: 0, description: "" }] } })}>➕ Add Flow Step</button>
              </div>

              {/* AddOn Benefits */}
              <div className="sub-section">
                <h3>🎁 Add-On Benefits</h3>
                {form.addOnBenefits.map((add, i) => (
                  <div key={i}>
                    <input
                      placeholder="Title"
                      value={add.title}
                      onChange={(e) => {
                        const newArr = [...form.addOnBenefits];
                        newArr[i].title = e.target.value;
                        setForm({ ...form, addOnBenefits: newArr });
                      }}
                    />
                    <input
                      placeholder="Image URL"
                      value={add.imageUrl}
                      onChange={(e) => {
                        const newArr = [...form.addOnBenefits];
                        newArr[i].imageUrl = e.target.value;
                        setForm({ ...form, addOnBenefits: newArr });
                      }}
                    />
                    <input
                      placeholder="Description"
                      value={add.description}
                      onChange={(e) => {
                        const newArr = [...form.addOnBenefits];
                        newArr[i].description = e.target.value;
                        setForm({ ...form, addOnBenefits: newArr });
                      }}
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={add.isFree}
                        onChange={(e) => {
                          const newArr = [...form.addOnBenefits];
                          newArr[i].isFree = e.target.checked;
                          setForm({ ...form, addOnBenefits: newArr });
                        }}
                      />
                      Free
                    </label>
                    <button type="button" onClick={() => removeItem("addOnBenefits", i)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => addItem("addOnBenefits", { title: "", imageUrl: "", description: "", isFree: false })}>➕ Add Add-On</button>
              </div>

              {/* Advantages */}
              <div className="sub-section">
                <h3>⭐ Advantages</h3>
                {form.advantages.map((adv, i) => (
                  <div key={i}>
                    <input
                      value={adv}
                      placeholder="Advantage text"
                      onChange={(e) => {
                        const newArr = [...form.advantages];
                        newArr[i] = e.target.value;
                        setForm({ ...form, advantages: newArr });
                      }}
                    />
                    <button type="button" onClick={() => removeItem("advantages", i)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => addItem("advantages", "")}>➕ Add Advantage</button>
              </div>

              {/* Quizzes */}
              <div className="sub-section">
                <h3>❓ Quizzes</h3>
                {form.quizzes.map((q, i) => (
                  <div key={i}>
                    <input
                      placeholder="Question"
                      value={q.question}
                      onChange={(e) => {
                        const newArr = [...form.quizzes];
                        newArr[i].question = e.target.value;
                        setForm({ ...form, quizzes: newArr });
                      }}
                    />
                    <input
                      placeholder="Options (comma separated)"
                      value={q.options.join(",")}
                      onChange={(e) => {
                        const newArr = [...form.quizzes];
                        newArr[i].options = e.target.value.split(",");
                        setForm({ ...form, quizzes: newArr });
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Correct Option Index"
                      value={q.correctOptionIndex}
                      onChange={(e) => {
                        const newArr = [...form.quizzes];
                        newArr[i].correctOptionIndex = Number(e.target.value);
                        setForm({ ...form, quizzes: newArr });
                      }}
                    />
                    <button type="button" onClick={() => removeItem("quizzes", i)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => addItem("quizzes", { question: "", options: [], correctOptionIndex: 0 })}>➕ Add Quiz</button>
              </div>

              {/* Price Options */}
              <div className="sub-section">
                <h3>💰 Price Options</h3>
                {form.priceOptions.map((p, i) => (
                  <div key={i}>
                    <select
                      value={p.billingCycle}
                      onChange={(e) => {
                        const newArr = [...form.priceOptions];
                        newArr[i].billingCycle = e.target.value;
                        setForm({ ...form, priceOptions: newArr });
                      }}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Price"
                      value={p.price}
                      onChange={(e) => {
                        const newArr = [...form.priceOptions];
                        newArr[i].price = Number(e.target.value);
                        setForm({ ...form, priceOptions: newArr });
                      }}
                    />
                    <input
                      placeholder="Currency"
                      value={p.currency}
                      onChange={(e) => {
                        const newArr = [...form.priceOptions];
                        newArr[i].currency = e.target.value;
                        setForm({ ...form, priceOptions: newArr });
                      }}
                    />
                    <input
                      type="date"
                      placeholder="Valid Till"
                      value={p.validTill ? p.validTill.split("T")[0] : ""}
                      onChange={(e) => {
                        const newArr = [...form.priceOptions];
                        newArr[i].validTill = e.target.value;
                        setForm({ ...form, priceOptions: newArr });
                      }}
                    />
                    <button type="button" onClick={() => removeItem("priceOptions", i)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => addItem("priceOptions", { billingCycle: "monthly", price: 0, currency: "INR" })}>➕ Add Price Option</button>
              </div>

              <button type="submit">{editId ? "Update Policy" : "Add Policy"}</button>
            </form>
          </section>

          {/* Policy List */}
          <section className="policy-list">
            <h2>📋 Policies</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="policy-grid">
                {policies.map((p) => (
                  <div key={p._id} className="policy-card">
                    <img src={p.imageUrl} alt={p.title} />
                    <h3>{p.title}</h3>
                    <p>{p.shortDescription}</p>
                    <div className="actions">
                      <button onClick={() => handleEdit(p)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default PolicyManager;
