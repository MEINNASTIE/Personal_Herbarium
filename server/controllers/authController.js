import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmailForgotPass from "../utils/emailForgot.js";

export const handleRegister = async (req, res, next) => {
  try {
    console.log("Register here:", req.body);
    let photo = "";
    console.log("Register file:", req.file);
    const { email, password, name, theme } = req.body;
    if (req.file) {
      photo = req.file.path;
    }
    console.log("register: photo is", photo);
    if (!email || !password || !name || !theme || !photo) {
      return res.status(400).json("incorrect form submission");
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hash, name, theme, photo });
    const data = await newUser.save();

    console.log("register: data is", data);
    res.json(data);
  } catch (err) {
    console.log("Register error:", err.message);
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
    const user = await User.findByIdAndUpdate(userId, { theme }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserTheme = async (req, res) => {
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
export const getForgorPage = async (req, res) => {
  try {
    console.log("ForgorPage:", req.body);
    const { nameOrEmail } = req.body;
    //console.log(await User.find())
    // const user = await User.findOne({
    //   $or: [{ email: req.body.nameOrEmail },
    //      { name: req.body.nameOrEmail }],
    // });
    const user = await User.findOne({
      email: nameOrEmail,
    });
    console.log("user:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20d",
    });
    sendEmailForgotPass(token, user.email);
    console.log("token:", token);

    res.send({ success: true });
  } catch (error) {
    console.log("error in ForgorPage:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};
export const getChangePassword = async (req, res) => {
  try {
    console.log("Change Password Page:", req.body);
    console.log("token:", req.params.token);
    const token = jwt.verify(req.body.token, process.env.JWT_SECRET);
    console.log("token:", token);

    const SALT_ROUND = 10;

    const hash = await bcrypt.hash(req.body.password, SALT_ROUND);
    console.log("hash:", hash);
    req.body.password = hash;

    const user = await User.findByIdAndUpdate(
      token.id,
      { password: req.body.password },
      { new: true }
    );
    console.log("User:", user);

    res.send({ success: true });
  } catch (error) {
    console.log("Error in Change Password Page:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};
