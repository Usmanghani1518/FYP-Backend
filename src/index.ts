import express , {Request , Response} from "express"
import authRoutes from "./routes/auth.route"
import cors from "cors"
import { connectDb } from "./config/db"

const app = express()
const port = process.env.PORT || 3000
connectDb()

app.use(cors())
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRoutes)



app.get("/", (req : Request , res:Response)=>{
    res.send("Hello EduConnect")
})
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
})