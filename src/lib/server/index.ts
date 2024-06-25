import express from 'express'
import cors from 'cors'
import parser from 'body-parser'
import cookieParser from 'cookie-parser'

const port = 4000

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.listen(port, () => {
  console.log(`server running ${port}`)
})
