const Category = require('../models/Category');

// Admin: create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, iconUrl } = req.body;
    if (!name || !iconUrl)
      return res.status(400).json({ message: 'Name and iconUrl required' });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Category already exists' });

    const category = await Category.create({
      name,
      iconUrl,
      createdBy: req.admin.id
    });
    res.status(201).json({ message: 'Category created', category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin/User: get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, iconUrl } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      { name, iconUrl },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category updated', category: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
