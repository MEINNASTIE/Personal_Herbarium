
import mongoose from "mongoose";
import { dbName, uri } from "./env-vars.js";

const connectDB = async () => {
    mongoose
      .connect(uri, { dbName })
      .then(() => {
        console.log("Connected to database", uri);
      })
      .catch((err) => {
        console.log("Error connecting to database", err.message);
      });
    mongoose.connection.on("error", (err) => {
      console.log("Mongoose connection error", uri);
    });
  
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection disconnected", uri);
    });
  };
  export default connectDB;