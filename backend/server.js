// ---------------------- Packages -----------------------------

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { json } = require('body-parser')
require('dotenv').config()

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

// -------------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('db connected!'))
  .catch((e) => console.log(e))

// -------------------------------------------------------------

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

app.use('/api', blogRoutes)
app.use('/api', authRoutes)
// -------------------------------------------------------------

const port = process.env.PORT

app.listen(port, () => console.log('listening on ' + port))
