
import connectDB from "./config/db.js";
import {port} from "./config/env-vars.js"
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import connectDB from './lib/mongo-db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());
app.use(cors())
connectDB();

app.use(cors({ origin: "http://localhost:5173" }));

app.get('/', (req, res) => {    
    res.send('Hello World');
    }); 

app.use("/plant",plantRoutes)
app.use("/auth",authRoutes);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });





