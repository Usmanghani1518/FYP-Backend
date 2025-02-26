import express , {Request , Response} from "express"
import authRoutes from "./routes/auth.route"
import courseRoutes from "./routes/course.route"
import teacherRoutes from "./routes/teacher.route"

import cors from "cors"
import { connectDb } from "./config/db"
import dotenv from "dotenv";
dotenv.config();

const app = express()
const port = process.env.PORT || 3000
connectDb()
app.use(
    cors({
      origin: "*", 
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(cors())
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/1", courseRoutes)
app.use("/api/v1/teacher", teacherRoutes)




app.get("/", (req : Request , res:Response)=>{
    res.send("Hello EduConnect")
})
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
})