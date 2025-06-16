import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDb from "../Database/db.js"
import bodyParser from "body-parser"
import {userRouter} from "../Routes/user.routes.js"


const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1/auth',userRouter)

connectDb().then(
  app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
)