import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import { handleCreate, handleDelete, handlegetplants,handleEdite, SearchPlants,getCategories,filterPlantsByCategory, getPlantById,getPlantsByUserId } from "../controllers/plantController.js";

import auth from "../middlewares/auth.js"

const plantRoutes = express.Router();


plantRoutes.get("/", auth, handlegetplants);
plantRoutes.get("/find/search", SearchPlants);
plantRoutes.post("/create", auth, uploadCloud.single("plant-image"),handleCreate);
plantRoutes.delete("/delete/:plantId",handleDelete);
plantRoutes.put("/edite/:plantId",handleEdite);
plantRoutes.get("/find/categories", auth,getCategories);
plantRoutes.get("/filter", filterPlantsByCategory);
plantRoutes.get('/user/:userId', getPlantsByUserId);
plantRoutes.get("/plant/:plantId", getPlantById)


export default plantRoutes;

// notice: to create unique routes always 