require('./global')
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import cors from 'cors'

dotenv.config()

const app = express()

const logStream = fs.createWriteStream(path.join(path.join(__dirname, 'logs'), 'requests.log'), {flags: 'a'})
app.use(morgan('dev', {
  stream:logStream
}));

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
import index from './routes/index'
app.use('/', index)


const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})