import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectWithDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', async (req, res) => {
    res.send('Hello from DALLE!');
  });

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

  const startServer = async () => {
    try {
        connectWithDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
      console.log(error);
    }
  };

  startServer();