import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import hospitalRoutes from './src/routes/hospitalRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import ragRoutes from './src/routes/ragRoutes.js';
import { authenticate } from './src/middleware/authMiddleware.js';

dotenv.config();
const app = express();

app.use(cors({origin: "https://hmsy.vercel.app/",
    methods: ["POST","GET","PUT","DELETE"],
    credentials: true }));
app.use(express.json());


// ✅ Corrected MongoDB URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ No global `authenticate`, it's handled inside `hospitalRoutes.js`
app.use('/api/v1/hospitals', hospitalRoutes);
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/rag", authenticate, ragRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
