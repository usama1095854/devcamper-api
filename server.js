const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorhandler = require('./middleware/error')
const connectDB = require('./config/db')

// Load config vars
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging midleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File upload
app.use(fileupload())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// define routes
app.use('/api/v1/bootcamps', require('./routes/bootcamps'))
app.use('/api/v1/courses', require('./routes/courses'))
app.use('/api/v1/auth', require('./routes/auth'))

app.use(errorhandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// Handle unhandle promise rejections
process.on('unhandledRejections', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server and exit process
  server.close(() => process.exit(1))
})
