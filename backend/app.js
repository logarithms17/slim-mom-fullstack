import express from "express"
import logger from "morgan"
import cors from "cors"

const app = express()


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Backend is working!!');
});

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