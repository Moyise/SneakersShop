const Product = require("../models/productModel");

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const products = await Product.find({ ...keyword });

    res.json({ products });
  } catch (error) {
    res.status(404).json({ message: "No products found" });
  }
};

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc Create a product
// @route POST /api/products
// @access Private/Admin

const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(404).json({ message: "Product creation failed" });
  }
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    console.log(image);

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private

const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw error;
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      res.status(201).json({ message: "Review added" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Product already reviewed" });
  }
};

// @desc Get top rated products
// @route GET /api/products/top
// @access Public

const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product already reviewed" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
