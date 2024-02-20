import express from "express";
import uploadCloud from "../middlewares/multerCloudinary.js";
import { handleCreate, handleDelete, handlegetplants,handleEdite, SearchPlants,getCategories,filterPlantsByCategory } from "../controllers/plantController.js";

const plantRoutes = express.Router();


plantRoutes.get("/",handlegetplants);
plantRoutes.get("/search", SearchPlants);
plantRoutes.post("/create",uploadCloud.single("plant-image"),handleCreate);
plantRoutes.delete("/delete/:plantId",handleDelete);
plantRoutes.put("/edite/:plantId",handleEdite);
plantRoutes.get("/categories", getCategories);
plantRoutes.get("/filter", filterPlantsByCategory);

export default plantRoutes;