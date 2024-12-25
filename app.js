import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { databaseConnection } from "./src/config/database.connection.js"
import authRouter from "./src/routes/auth.route.js"

dotenv.config({
	path: ".env",
});

const PORT = 3000


const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",authRouter)



databaseConnection()
app.listen(PORT,()=>{
    console.log(`app is running on port http://localhost:${PORT}/`)
})
app.get("/", (req, res) => {
    res.send("this is the express app ");
});
