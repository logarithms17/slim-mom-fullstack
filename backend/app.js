import express from "express"
import logger from "morgan"
import cors from "cors"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from "./swaggerOptions.js";

import { router as usersRouter } from "./routes/api/usersRouter.js"
import {router as productsRouter } from "./routes/api/productsRouter.js"

const app = express()

const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Log Swagger setup
console.log("Swagger setup complete. Access at /api-docs");

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))

// Define your CORS options
const corsOptions = {
  origin: ['http://localhost:3000', 'https://logarithms17.github.io'], // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
  credentials: true, // Allow cookies and credentials
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests globally
app.options('*', cors(corsOptions));

app.use(express.json())

//middleware for users router
app.use('/api/users', usersRouter)

//middleware for products router
app.use('/api/products', productsRouter)


// 404 Error Handler
app.use((_req, res) => {
  console.log("404 Error Handled")
  res.status(404).json({ message: 'Not found' })
})

// General Error Handler
app.use((err, _req, res, _next) => {
  console.log(err.message)
  res.status(500).json({ message: err.message })
})


export default app