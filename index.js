import express  from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import DreamlandRoutes from "./routes/DreamlandRoute.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/Dreamland",DreamlandRoutes);
app.get("/",async(req, res)=>{
    res.send("Hello from Dreamland!");
})

const startServer=async()=>{
    try{
      await connectDB(process.env.MONGODB_URL)
         app.listen(8080,()=>{
            console.log(`Server is running on http://localhost:8080`);
        })
    }catch(err){
        console.log(err);
    }
}

startServer();