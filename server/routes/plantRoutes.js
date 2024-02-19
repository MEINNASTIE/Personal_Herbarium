import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import { handleCreate, handleDelete, handlegetplants,handleEdite } from "../controllers/plantController.js";

const plantRoutes = express.Router();


plantRoutes.get("/",handlegetplants)
plantRoutes.post("/create",uploadCloud.single("plant-image"),handleCreate)
plantRoutes.delete("/delete/:plantId",handleDelete)
plantRoutes.put("/edite/:plantId",handleEdite)

export default plantRoutes;