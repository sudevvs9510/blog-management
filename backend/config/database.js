import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async() => {
    try{
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri)
        console.log("Database connected successfully.....")
    } catch(error){
        console.error("could not connect to MongoDB", error)
        process.exit(1)
    }
}

export default connectDB;