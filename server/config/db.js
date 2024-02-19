import mongoose from "mongoose";
import "dotenv/config";
import {uri, dbName } from "./env-vars.js"



export default async function connectDB(){
    try {
        await mongoose.connect(uri);
        console.log("successful connected to DB");
    } catch (error) {
        console.log("error connecting to db", error.message);
    }
}





