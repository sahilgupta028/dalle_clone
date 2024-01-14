import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const configuration = {
    apiKey: process.env.OPEN_AI_KEY,
  };

const openai = new OpenAI(configuration);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });

router.route('/').post(async(req, res) => {
    try{
        const { prompt } = req.body;

        const ai = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            // response_format: 'b64_json',
        });

        const image = ai.data[0].url;
        res.status(200).json({ post: image});
    } catch(error){
        console.error(error);
        res.status(500).send('something went wrong');
    }
});

export default router;