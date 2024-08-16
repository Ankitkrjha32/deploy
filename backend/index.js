import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import noteRoutes from './routes/note.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'https://frontend-eight-roan-64.vercel.app',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const PORT =4000;

// APIs
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/v1/user', userRoute);
app.use('/api/v1/notes', noteRoutes);

// Vercel serverless function compatibility
export default app;  // Ensure this works for Vercel
