// import necessary packages as modules
import express, { json } from 'express'
import dotenv from 'dotenv'
import UserRouter from './routers/userRouter.js'
import AdminRouter from './routers/adminRouter.js'
import PromptRouter from './routers/promptsRouter.js'
import ExporterRouter from './routers/exporterRouter.js'
import { connection } from './database/connection.js'
import cors from 'cors'
// get all the environment variables
dotenv.config()

// setup the application
const app = express()
const port = process.env.PORT

// connect to the database
connection();
// use middlewares for auth, cors and parsing
app.use(cors())
app.use(json())
app.use(express.urlencoded({ extended: true }))
// first endpoint
app.get('/', (req, res) => {
  res.send('Shrimp Talker is Ready to Talk!')
})
// other routers
app.use("/api/v1/user",UserRouter)
app.use("/api/v1/admin",AdminRouter)
app.use("/api/v1/prompts",PromptRouter)
app.use("/api/v1/exporter",ExporterRouter)

// default port listening
app.listen(port, () => {
  console.log(`Shrimp Talker is talking from the back-end! on port ${port}`)
})