import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import PostSchema from '../mongodb/models/post.js';
dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  router.route('/').get(async (req, res) => {
    try {
      const posts = await PostSchema.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });

  router.route('/').post(async(req, res) => {
    try{
      const { name, prompt, photo} = req.body;
      const purl = await cloudinary.uploader.upload(photo);

      const newPost = await PostSchema.create({
        name,
        prompt,
        photo: purl.url, 
      });
      res.status(200).json({ success: true, data: newPost });
    } catch(err){
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  })

export default router;