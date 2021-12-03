const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const morgan = require('morgan')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/errorHandler')
require('dotenv').config()
const app = express()

// constatns
const api = process.env.API_URL
const port = process.env.PORT

// middleware
app.use(cors())
app.options('*', cors())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(express.json())
app.use(errorHandler)

//routes
const productsRoutes = require('./routes/trackerRoutes')
const usersRoutes = require('./routes/userRoutes')

app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)

// server & database
mongoose.connect(process.env.CONNECTION_STRING, () => {
    console.log("Database Connected")
    app.listen(port || 5000, () => {
        console.log("Server live on port 8000")
    })
})