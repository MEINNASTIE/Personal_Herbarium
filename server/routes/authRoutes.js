import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import { getUserById, getUserTheme, handleLogin, handleRegister,getForgorPage,getChangePassword, updateUser,getAllUsers } from "../controllers/authController.js";



const router = express.Router();

router.post("/register", uploadCloud.single("photo"),handleRegister);
// router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/forgotpassword",getForgorPage)
router.patch("/changePassword", getChangePassword);
router.get("/all-users", getAllUsers)

// theme handling routes
router.put('/:userId', updateUser);
router.get("/:userId/theme", getUserTheme)
router.get("/:userId", getUserById)

export default router;