import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegister = async (req, res, next) => {
  try {
    const { email, password, name, theme } = req.body;
    if (!email || !password || !name || !theme) {
      return res.status(400).json("incorrect form submission");
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hash, name, theme });
    const data = await newUser.save();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const handleLogin = async (req, res) => {
  try {
    console.log("Login:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("user:", user);

    if (!user) {
      return res.send({
        success: false,
        error: "Email or password not correct",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);

    if (!isMatch) {
      return res.send({
        success: false,
        error: "Email or password not correct",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20d",
    });
    console.log("token:", token);

    res.json({ success: true, user, token, theme: user.theme });
  } catch (error) {
    console.log("error in login:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

// For theme handling

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { theme } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { theme },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserTheme = async (req, res) =>
 {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const theme = user.theme;
    res.status(200).json({ theme });
  } catch (error) {
    console.error("Error fetching user's theme:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};