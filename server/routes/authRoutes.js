import express from "express";
import { getUserById, getUserTheme, handleLogin, handleRegister, updateUser,getAllUsers } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/all-users", getAllUsers)

// theme handling routes
router.put('/:userId', updateUser);
router.get("/:userId/theme", getUserTheme)
router.get("/:userId", getUserById)

export default router;