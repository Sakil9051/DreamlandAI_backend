import mongoose from "mongoose";

const Prompt=new mongoose.Schema({
    prompt:{type:String,required:"true"}
});

const PromptSchema = mongoose.model("Prompt",Prompt);

export default PromptSchema;