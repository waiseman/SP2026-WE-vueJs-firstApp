import express from 'express'
import cors    from 'cors'
import dotenv  from 'dotenv'
import userRoutes from './routes/users.js'
dotenv.config()

const app = express()

// Middleware
app.use(cors())              // allow Vue to connect
app.use(express.json())     // parse JSON bodies

// Routes
app.use('/api/users', userRoutes)

app.listen(3000, () =>
  console.log('Server on http://localhost:3000'))
