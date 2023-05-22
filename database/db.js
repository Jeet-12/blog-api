import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.DB).then(()=>console.log("DB is connected")).catch((err) => console.log(err));