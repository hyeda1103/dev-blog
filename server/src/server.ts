import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';

// routes
import authRoutes from './routes/auth'

// config
import { connectDB } from '../config';

dotenv.config();

const app: Application = express();

connectDB();

// app middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({
  origin: process.env.CLIENT_URL
}))

// middlewares
app.use('/api', authRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`API is running on port ${port}`))
