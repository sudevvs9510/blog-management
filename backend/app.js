import express from 'express';
import cors from 'cors';
import connectDB from "./config/database.js";
import userRoutes from './routers/userRoutes.js';
import blogRoutes from './routers/blogRoutes.js';

import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({
    origin: "http//localhost:8000"
}))

app.use(express.json());

connectDB()

app.use('/user', userRoutes)
app.use('/blogs',blogRoutes)


const port = process.env.PORT || 3030;
// const port =  3040;


app.listen(port,()=> console.log(`Server running on ${port}`))