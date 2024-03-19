const express = require('express')
const cors = require('cors')
const { connectToMongoDB } = require('./connection')
require('dotenv').config()
const userRoute = require('./routes/userRoute');
const { errorHandler } = require('./middleware/errorMiddleware') 



const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({origin: true,credentials:true}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user',userRoute)

app.use(errorHandler)
connectToMongoDB()
    .then(app.listen(PORT,()=>{ //connection to port
        console.log(`Server is listening to port ${HOST,PORT}`)
    })
    )
    .catch(error =>{
        console.error('Error starting server', error)
        process.exit(1)
    })


app.get('/', (req, res)=>{
    res.send('sample')
})