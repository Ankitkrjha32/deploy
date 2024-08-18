import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import noteRoutes from '././routes/note.route.js'




dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'https://your-frontend-app.com', // Allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies
};

// Use CORS middleware
app.use(cors(corsOptions));

// Enable preflight response for all routes
app.options('*', cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 8000;

// APIs
app.use('/api/v1/user', userRoute);
app.use('/api/v1/notes', noteRoutes);

// Root Route to Test the Server (Optional)
app.get('/', (req, res) => {
res.send('Welcome to the backend server!');
});

// 404 Fallback Route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
