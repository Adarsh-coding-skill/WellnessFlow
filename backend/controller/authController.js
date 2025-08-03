const jwt = require("jsonwebtoken");
const bcrypt = require( "bcryptjs");
const User = require("../Models/User.js");
const ErrorHandler = require("../untils/ErrorHandler.js");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = createToken(newUser._id);

    res
      .cookie("token", token, { httpOnly: true, sameSite: "Lax" })
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (err) {
  
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
     
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    console.log(" User found:", user);

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", isPasswordMatched);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = createToken(user._id);
    res
      .cookie("token", token, { httpOnly: true,secure: false, sameSite: "Lax" })
      .status(200)
      .json({ message: "Login successful", user: { id: user._id, name: user.name } });
  } catch (err) {

    res.status(500).json({ message: "Server error", error: err.message });
  }
};



const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax", 
    secure: false,   
  });
  res.status(200).json({ message: "Logged out" });
};

const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {login,register,logout,getProfile};