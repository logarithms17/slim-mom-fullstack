import express from "express"
import logger from "morgan"
import cors from "cors"

import { router as usersRouter } from "./routes/api/usersRouter.js"

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

//middleware for users router
app.use('/api/users', usersRouter)


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