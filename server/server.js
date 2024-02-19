import express from 'express';
import authRoutes from './routes/authRoutes.js';
import connectDB from './lib/mongo-db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors())
connectDB();
app.use("/auth",authRoutes);


app.get('/', (req, res) => {    
    res.send('Hello World');
    }); 
    
app.use(errorMiddleware);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
}  );