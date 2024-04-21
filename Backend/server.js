const express = require('express')
const cors = require('cors')
const { connectToMongoDB } = require('./connection')
require('dotenv').config()
const userRoute = require('./routes/userRoute');
const videoRoute = require('./routes/videoRoute')
const categoryRoute = require("./routes/categoryRoutes")
const { errorHandler } = require('./middleware/errorMiddleware')
const questionRoute = require("./routes/questionRoute")
const postRoute = require("./routes/postRoute")
const { protect } = require("./middleware/authMiddleware")



const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({origin: true,credentials:true}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user',userRoute)
app.use('/api/post', postRoute)
app.use('/api/question', questionRoute)
app.use("/api/documents",express.static("Documents"))
app.use("/api/videos",express.static("Videos"))
app.use('/api/categories',categoryRoute)
//app.use('/api/post',videoRoute)

//app.use(errorHandler)
connectToMongoDB()
    .then(app.listen(PORT,()=>{ //connection to port
        console.log(`Server is listening to port ${PORT}`)
    })
    )
    .catch(error =>{
        console.error('Error starting server', error)
        process.exit(1)
    })