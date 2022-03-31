import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import cors from 'cors';

// routes
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import categoryRoutes from './routes/category'
import linkRoutes from './routes/link'

// config
import { connectDB } from '../config';

dotenv.config();

const app: Application = express();

connectDB();

// app middlewares
app.use(morgan('dev'))
app.use(bodyParser.json({
  limit: '5mb',
  type: 'application/json'
}))
app.use(cors({
  origin: process.env.CLIENT_URL
}))

// middlewares
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', linkRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`API is running on port ${port}`))
