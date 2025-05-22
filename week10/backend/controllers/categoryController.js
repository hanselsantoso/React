const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 }); // Sort by name
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Public (adjust access control as needed)
const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const category = new Category({ name, description });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Public
const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      // Check if new name conflicts with an existing category (excluding itself)
      if (name && name !== category.name) {
        const existingCategory = await Category.findOne({ name: name, _id: { $ne: req.params.id } });
        if (existingCategory) {
          return res.status(400).json({ message: 'Another category with this name already exists' });
        }
      }
      category.name = name || category.name;
      category.description = description !== undefined ? description : category.description;
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};


// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Public
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            // Optional: Check if any product uses this category before deleting
            // const Product = require('../models/Product'); // Import Product model
            // const productsUsingCategory = await Product.findOne({ category: req.params.id });
            // if (productsUsingCategory) {
            //   return res.status(400).json({ message: 'Cannot delete category. It is currently in use by products.' });
            // }
            await category.deleteOne();
            res.status(200).json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};