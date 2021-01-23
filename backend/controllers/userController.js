const User = require("../models/userModel");

const generateToken = require("../utils/generateToken");

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      throw error; //<-- THIS IS ESSENTIAL FOR BREAKING THE CHAIN
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// @desc Register new user
// @route POST /api/users
// @access Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// @desc Get user profile
// @route GET /api/users/profile
// @access private

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access private

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc Get all users
// @route GET /api/users
// @access private/Admin

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "Users not found" });
  }
};

// @desc Delete user
// @route DELETE /api/users/:id
// @access private/Admin

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc Get user by ID
// @route GET /api/users/:id
// @access private/Admin

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc Update user
// @route PUT /api/users/:id
// @access private/Admin

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
