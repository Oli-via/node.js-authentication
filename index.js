/**
 * Created by aliyy on 2017/1/23.
 */

// Main starting point of the application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth')

// App Setup

// morgan and bodyParser are middleware, any incoming request will path into them
app.use(morgan('combined'))   // morgan is a logging framework. it will console.log the coming request. mostly used in debug
app.use(bodyParser.json({ type: '*/*' })) // bodyParser is to parse incoming request, specifically parse into json.
router(app)


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port)
console.log('Server is listening on:', port)


// nodemon is to watch our project directory for any file changes
// if a file ever changes, it will immediately restart the server
// so the server is updated with whatever the changes we ever made