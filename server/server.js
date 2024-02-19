import express from "express";
import connectDB from "./config/db.js";
import {port} from "./config/env-vars.js"
import cors from 'cors';
import plantRoutes from "./routes/plantRoutes.js";


const app = express();
connectDB();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));


app.use("/plant",plantRoutes)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });