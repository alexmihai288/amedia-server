require('dotenv').config()

//import extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss  = require('xss-clean')

//server
const express = require('express')
const app = express()

//import connectDB
const connectDB = require('./db/connectDB')


//import routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const searchRoute = require('./routes/search')
const userRoute = require('./routes/user')

//import errors
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandler  = require('./middlewares/error-handler')

//extra security packages
app.use(express.json());

app.set('trust proxy',1)

 //protection packages 
 app.use(helmet())
 app.use(cors())
 app.use(xss())
 

 //routes
 app.use('/authenticate',authRoute)
 app.use('/posts',postsRoute)
 app.use('/search',searchRoute)
 app.use('/user',userRoute)

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