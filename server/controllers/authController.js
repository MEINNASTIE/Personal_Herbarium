import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/env-vars.js";



export const handleRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json("incorrect form submission");
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hash, name });
    const data = await newUser.save();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("incorrect form submission");
    }
    const data = await User.find({ email });
    const isValid = await bcrypt.compare(password, data[0].password);
    if (isValid) {
      // Create a JWT token
      const token = jwt.sign(
        { userId: data[0]._id, email: data[0].email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send the token in the response
      res.json({ user: { id: data[0]._id, email: data[0].email }, token });
    } else {
      res.status(400).json("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};
