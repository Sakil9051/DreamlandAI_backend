import express  from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import DreamlandRoutes from "./routes/DreamlandRoute.js";
import PromptSchema from "./mongodb/models/prompt.js";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/Dreamland",DreamlandRoutes);
app.get("/",async(req, res)=>{
    res.status(200).json("Hello from Dreamland!");
})

app.get("/prompt",async(req, res)=>{
    let surpriseMePrompts =await PromptSchema.find({});
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
    res.status(200).json(randomPrompt);
})
app.post("/prompt",async(req, res)=>{
    let prompt=req.body.prompt;
    console.log("in prompt")
    let AllPrompts =await PromptSchema.find({prompt});
    if(AllPrompts.length==0){
        const response = await PromptSchema.create({
            prompt,
          });
          console.log(response)
    }
    
    if(AllPrompts.length>0){
        return res.status(200).json({message:"Prompt already exist"});
    }
    console.log(AllPrompts)
    res.status(200).json({message:"Prompt added successfully"});
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