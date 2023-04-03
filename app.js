require('dotenv').config()

//import extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss  = require('xss-clean')
const rateLimit = require('express-rate-limit')

//server
const express = require('express')
const app = express()

//import connectDB
const  connectDB = require('./db/connectDB')

//import authenticate


//import routes
const authRoute = require('./routes/auth')

//import errors
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandler  = require('./middlewares/error-handler')

//extra security packages
app.use(express.json());

app.set('trust proxy',1)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,// 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
 }))
 //protection packages 
 app.use(helmet())
 app.use(cors())
 app.use(xss())
 

 //routes
 app.use('/authenticate',authRoute)

 //errors
 app.use(notFoundMiddleware)
 app.use(errorHandler)


 const PORT =  process.env.PORT || 5000 

 const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,console.log(`Server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
 }

 start()