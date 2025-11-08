// // import React, { useState, useEffect, useContext } from "react";
// // import { AdminAuthContext } from "../../context/AdminAuthContext";
// // import api from "../../api/axios"; // <-- your api instance
// // import "./AdminCalculatorPanel.css";

// // const AdminCalculatorPanel = () => {
// //   const { admin } = useContext(AdminAuthContext);

// //   const [categories, setCategories] = useState([]);
// //   const [calculators, setCalculators] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [newCategory, setNewCategory] = useState({ name: "", description: "" });
// //   const [newCalculator, setNewCalculator] = useState({
// //     category: "",
// //     name: "",
// //     description: "",
// //     parameters: [],
// //     formula: "",
// //   });

// //   // Fetch categories and calculators
// //   const fetchCategories = async () => {
// //     try {
// //       const { data } = await api.get("/calculators/categories");
// //       if (Array.isArray(data)) setCategories(data);
// //       else setCategories([]);
// //     } catch (err) {
// //       console.error(err);
// //       setCategories([]);
// //     }
// //   };

// //   const fetchCalculators = async () => {
// //     try {
// //       const { data } = await api.get("/calculators");
// //       if (Array.isArray(data)) setCalculators(data);
// //       else setCalculators([]);
// //     } catch (err) {
// //       console.error(err);
// //       setCalculators([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategories();
// //     fetchCalculators();
// //   }, []);

// //   // ===== Category Actions =====
// //   const handleAddCategory = async () => {
// //     if (!newCategory.name) return alert("Category name required");
// //     try {
// //       const { data } = await api.post("/calculators/categories", newCategory);
// //       setCategories((prev) => [...prev, data.category]);
// //       setNewCategory({ name: "", description: "" });
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleDeleteCategory = async (id) => {
// //     if (!window.confirm("Delete this category?")) return;
// //     try {
// //       await api.delete(`/calculators/categories/${id}`);
// //       setCategories((prev) => prev.filter((cat) => cat._id !== id));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // ===== Calculator Actions =====
// //   const handleAddCalculator = async () => {
// //     if (!newCalculator.name || !newCalculator.category) return alert("Fill all fields");
// //     try {
// //       const { data } = await api.post("/calculators", newCalculator);
// //       setCalculators((prev) => [...prev, data.calculator]);
// //       setNewCalculator({ category: "", name: "", description: "", parameters: [], formula: "" });
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleDeleteCalculator = async (id) => {
// //     if (!window.confirm("Delete this calculator?")) return;
// //     try {
// //       await api.delete(`/calculators/${id}`);
// //       setCalculators((prev) => prev.filter((calc) => calc._id !== id));
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // ===== Parameter Management =====
// //   const addParameterField = () => {
// //     setNewCalculator((prev) => ({
// //       ...prev,
// //       parameters: [...prev.parameters, { name: "", type: "number", options: [], required: true }],
// //     }));
// //   };

// //   const updateParameterField = (index, field, value) => {
// //     const updatedParams = [...newCalculator.parameters];
// //     updatedParams[index][field] = value;
// //     setNewCalculator((prev) => ({ ...prev, parameters: updatedParams }));
// //   };

// //   const removeParameterField = (index) => {
// //     const updatedParams = [...newCalculator.parameters];
// //     updatedParams.splice(index, 1);
// //     setNewCalculator((prev) => ({ ...prev, parameters: updatedParams }));
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="admin-calculator-panel">
// //       <h2>Admin Calculator Panel</h2>

// //       {/* Categories */}
// //       <section className="admin-section">
// //         <h3>Manage Categories</h3>
// //         <div className="add-category">
// //           <input
// //             type="text"
// //             placeholder="Category Name"
// //             value={newCategory.name}
// //             onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Description"
// //             value={newCategory.description}
// //             onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
// //           />
// //           <button onClick={handleAddCategory}>Add Category</button>
// //         </div>
// //         <ul className="category-list">
// //           {Array.isArray(categories) &&
// //             categories.map((cat) => (
// //               <li key={cat._id}>
// //                 {cat.name} 
// //                 <button onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
// //               </li>
// //             ))}
// //         </ul>
// //       </section>

// //       {/* Calculators */}
// //       <section className="admin-section">
// //         <h3>Manage Calculators</h3>
// //         <div className="add-calculator">
// //           <select
// //             value={newCalculator.category}
// //             onChange={(e) => setNewCalculator({ ...newCalculator, category: e.target.value })}
// //           >
// //             <option value="">Select Category</option>
// //             {Array.isArray(categories) &&
// //               categories.map((cat) => (
// //                 <option key={cat._id} value={cat._id}>
// //                   {cat.name}
// //                 </option>
// //               ))}
// //           </select>
// //           <input
// //             type="text"
// //             placeholder="Calculator Name"
// //             value={newCalculator.name}
// //             onChange={(e) => setNewCalculator({ ...newCalculator, name: e.target.value })}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Description"
// //             value={newCalculator.description}
// //             onChange={(e) => setNewCalculator({ ...newCalculator, description: e.target.value })}
// //           />
// //           <input
// //             type="text"
// //             placeholder="Formula"
// //             value={newCalculator.formula}
// //             onChange={(e) => setNewCalculator({ ...newCalculator, formula: e.target.value })}
// //           />

// //           <div className="parameters">
// //             <h4>Parameters</h4>
// //             {newCalculator.parameters.map((param, idx) => (
// //               <div key={idx} className="parameter-field">
// //                 <input
// //                   type="text"
// //                   placeholder="Parameter Name"
// //                   value={param.name}
// //                   onChange={(e) => updateParameterField(idx, "name", e.target.value)}
// //                 />
// //                 <select
// //                   value={param.type}
// //                   onChange={(e) => updateParameterField(idx, "type", e.target.value)}
// //                 >
// //                   <option value="number">Number</option>
// //                   <option value="select">Select</option>
// //                   <option value="date">Date</option>
// //                 </select>
// //                 {param.type === "select" && (
// //                   <input
// //                     type="text"
// //                     placeholder="Options (comma separated)"
// //                     value={param.options.join(",")}
// //                     onChange={(e) =>
// //                       updateParameterField(idx, "options", e.target.value.split(","))
// //                     }
// //                   />
// //                 )}
// //                 <button onClick={() => removeParameterField(idx)}>Remove</button>
// //               </div>
// //             ))}
// //             <button onClick={addParameterField}>Add Parameter</button>
// //           </div>

// //           <button onClick={handleAddCalculator}>Add Calculator</button>
// //         </div>

// //         <ul className="calculator-list">
// //           {Array.isArray(calculators) &&
// //             calculators.map((calc) => (
// //               <li key={calc._id}>
// //                 {calc.name} ({calc.category?.name || "No Category"})
// //                 <button onClick={() => handleDeleteCalculator(calc._id)}>Delete</button>
// //               </li>
// //             ))}
// //         </ul>
// //       </section>
// //     </div>
// //   );
// // };

// // export default AdminCalculatorPanel;



import React, { useState, useEffect, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import api from "../../api/axios"; // Axios instance with token and baseURL
import "./AdminCalculatorPanel.css";

const AdminCalculatorPanel = () => {
  const { admin } = useContext(AdminAuthContext);

  const [categories, setCategories] = useState([]);
  const [calculators, setCalculators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newCategory, setNewCategory] = useState({ name: "", iconUrl: "" });
  const [newCalculator, setNewCalculator] = useState({
    category: "",
    name: "",
    description: "",
    parameters: [],
    formula: "",
  });

  // Fetch categories and calculators
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(Array.isArray(data.categories) ? data.categories : []);
    } catch (err) {
      console.error(err);
      setCategories([]);
      setError("Failed to fetch categories");
    }
  };

  const fetchCalculators = async () => {
    try {
      const { data } = await api.get("/calculators");
      setCalculators(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setCalculators([]);
      setError("Failed to fetch calculators");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCalculators();
  }, []);

  // ===== Category Actions =====
  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.iconUrl)
      return alert("Name and Icon URL required");
    try {
      const { data } = await api.post("/categories", newCategory);
      setCategories((prev) => [...prev, data.category]);
      setNewCategory({ name: "", iconUrl: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  // ===== Calculator Actions =====
  const handleAddCalculator = async () => {
    if (!newCalculator.name || !newCalculator.category)
      return alert("Fill all fields");
    try {
      const { data } = await api.post("/calculators", newCalculator);
      setCalculators((prev) => [...prev, data.calculator]);
      setNewCalculator({
        category: "",
        name: "",
        description: "",
        parameters: [],
        formula: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add calculator");
    }
  };

  const handleDeleteCalculator = async (id) => {
    if (!window.confirm("Delete this calculator?")) return;
    try {
      await api.delete(`/calculators/${id}`);
      setCalculators((prev) => prev.filter((calc) => calc._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete calculator");
    }
  };

  // ===== Parameter Management =====
  const addParameterField = () => {
    setNewCalculator((prev) => ({
      ...prev,
      parameters: [
        ...prev.parameters,
        { name: "", type: "number", options: [], required: true },
      ],
    }));
  };

  const updateParameterField = (index, field, value) => {
    const updatedParams = [...newCalculator.parameters];
    updatedParams[index][field] = value;
    setNewCalculator((prev) => ({ ...prev, parameters: updatedParams }));
  };

  const removeParameterField = (index) => {
    const updatedParams = [...newCalculator.parameters];
    updatedParams.splice(index, 1);
    setNewCalculator((prev) => ({ ...prev, parameters: updatedParams }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-calculator-panel">
      <h2>Admin Calculator Panel</h2>
      {error && <p className="error">{error}</p>}

      {/* Categories */}
      <section className="admin-section">
        <h3>Manage Categories</h3>
        <div className="add-category">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Icon URL"
            value={newCategory.iconUrl}
            onChange={(e) =>
              setNewCategory({ ...newCategory, iconUrl: e.target.value })
            }
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat._id}>
              {cat.name}{" "}
              <button onClick={() => handleDeleteCategory(cat._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Calculators */}
      <section className="admin-section">
        <h3>Manage Calculators</h3>
        <div className="add-calculator">
          <select
            value={newCalculator.category}
            onChange={(e) =>
              setNewCalculator({ ...newCalculator, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Calculator Name"
            value={newCalculator.name}
            onChange={(e) =>
              setNewCalculator({ ...newCalculator, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newCalculator.description}
            onChange={(e) =>
              setNewCalculator({ ...newCalculator, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Formula"
            value={newCalculator.formula}
            onChange={(e) =>
              setNewCalculator({ ...newCalculator, formula: e.target.value })
            }
          />

          <div className="parameters">
            <h4>Parameters</h4>
            {newCalculator.parameters.map((param, idx) => (
              <div key={idx} className="parameter-field">
                <input
                  type="text"
                  placeholder="Parameter Name"
                  value={param.name}
                  onChange={(e) => updateParameterField(idx, "name", e.target.value)}
                />
                <select
                  value={param.type}
                  onChange={(e) => updateParameterField(idx, "type", e.target.value)}
                >
                  <option value="number">Number</option>
                  <option value="select">Select</option>
                  <option value="date">Date</option>
                </select>
                {param.type === "select" && (
                  <input
                    type="text"
                    placeholder="Options (comma separated)"
                    value={param.options.join(",")}
                    onChange={(e) =>
                      updateParameterField(idx, "options", e.target.value.split(","))
                    }
                  />
                )}
                <button onClick={() => removeParameterField(idx)}>Remove</button>
              </div>
            ))}
            <button onClick={addParameterField}>Add Parameter</button>
          </div>

          <button onClick={handleAddCalculator}>Add Calculator</button>
        </div>

        <ul className="calculator-list">
          {calculators.map((calc) => (
            <li key={calc._id}>
              {calc.name} ({calc.category?.name || "No Category"})
              <button onClick={() => handleDeleteCalculator(calc._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminCalculatorPanel;
