import express from "express";
import * as dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_cloud_name,
    api_key: process.env.CLOUDINARY_api_key,
    api_secret:process.env.CLOUDINARY_api_secret,
  });


// GET All posts

router.route("/").get(async (req, res) => {
    try{
        const posts = await Post.find({});
        res.status(200).json({success: true,data: posts});
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message:err});
    }
})

// CREATE a new post
router.route("/").post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
    
        const newPost = await Post.create({
          name,
          prompt,
          photo: photoUrl.url,
        });
        
        res.status(200).json({ success: true, data: newPost });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
      }
})

export default router;