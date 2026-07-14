import express from 'express'
import cors    from 'cors'
import dotenv  from 'dotenv'
import userRoutes from './Routes/users.js'
import mongoose from 'mongoose'
dotenv.config()

const app = express()

// Middleware
app.use(cors())              // allow Vue to connect
app.use(express.json())     // parse JSON bodies

// Routes
app.use('/api/users', userRoutes)

// connect to MongoDB
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Connected to:", conn.connection.host);
  } catch (err) {
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Cause:", err.cause);
    console.error(err);
    console.log(process.env.MONGO_URI)
  }
}


app.listen(3000, () =>
  console.log('Server on http://localhost:3000'))
connectDB()
