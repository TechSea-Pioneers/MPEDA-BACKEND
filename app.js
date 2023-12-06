// import necessary packages as modules
import express from 'express'
import dotenv from 'dotenv'
import UserRouter from './routers/userRouter.js'
import PromptRouter from './routers/promptsRouter.js'
// get all the environment variables
dotenv.config()

// setup the application
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Shrimp Talker is Ready to Talk!')
})

app.use("/user",UserRouter)
app.use("/prompts",PromptRouter)
app.listen(port, () => {
  console.log(`Shhhhhhh.... Shrimp Talker is talking from the back-end! on port ${port}`)
})