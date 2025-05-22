const Product = require('../models/Product');
const Category = require('../models/Category'); // Make sure Category model is accessible

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    .populate('category', 'name');;
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, price, stock, supplier, category } = req.body; 
  try {
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid Category ID' });
      }
    }

    const product = new Product({ name, price, stock, supplier, category });
    const createdProduct = await product.save();
    const populatedProduct = await Product.findById(createdProduct._id).populate('category', 'name');
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { name, price, stock, supplier, category } = req.body; 
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (category && category !== product.category.toString()) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(400).json({ message: 'Invalid new Category ID' });
        }
      }

      product.name = name || product.name;
      product.price = price !== undefined ? price : product.price;
      product.stock = stock !== undefined ? stock : product.stock;
      product.supplier = supplier || product.supplier;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      const populatedProduct = await Product.findById(updatedProduct._id).populate('category', 'name');
      res.status(200).json(populatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: 'Product removed', _id: req.params.id }); 
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};