import express from "express";
import moragan from "morgan";
import dotenv  from "dotenv";
import connectDB from './config/db.js'
import userRoutes from "./routes/userRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import webMessageRoutes from "./routes/webMessageRoutes.js";
import doctorRoutes from './routes/doctorRoutes.js'
import AppointmentRoutes from './routes/appointmentRoutes.js'
import cors from 'cors'

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5174", // Admin (Vite)
    "http://localhost:3000"  // User system (React)
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use('/api/v1/test', testRoutes)

// app.get('/', return (res.send('<h1>Backend Running</h1>')))

//middlewares
app.use(express.json());
app.use(moragan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/webmessage", webMessageRoutes)
app.use("/api/v1/doctor", doctorRoutes)
app.use("/api/v1/appointment", AppointmentRoutes)

export default app;