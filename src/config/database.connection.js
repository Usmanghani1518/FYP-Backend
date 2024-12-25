import exp from "constants";
import mongoose from "mongoose";


const databaseConnection = async ()=>{
    const DATABASE_URI= process.env.DATABASE_URI
    console.log("enve value",DATABASE_URI)
    try {
        await mongoose.connect(`${DATABASE_URI}`)
        console.log("Database connected")
    } catch (error) {
        console.log(`error in database connection ${error}`)
    }
}



export  {databaseConnection}