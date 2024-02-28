
import connectDB from "./config/db.js";
import {port} from "./config/env-vars.js"
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import plantRoutes from "./routes/plantRoutes.js";
import errorMiddleware from './middlewares/errorMiddleware.js';
import { client_app_url } from "./lib/env-vars.js";


const app = express();
app.use(express.json());
app.use(cors())
connectDB();

app.use(cors({ origin: client_app_url}));


app.use("/plant",plantRoutes)
app.use("/auth",authRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });





