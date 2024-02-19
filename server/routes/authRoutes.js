import express from "express";
import { getUserById, getUserTheme, handleLogin, handleRegister, updateUser } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);

// theme handling routes
router.put('/:userId', updateUser);
router.get("/:userId/theme", getUserTheme)
router.get("/:userId", getUserById)

export default router;