const mongoose = require('mongoose')
require('dotenv').config()

const connectionString = process.env.CONNECTION_STRING

const connectToMongoDB = async () => {
    try { //connecting to mongoDB database
        await mongoose.connect(connectionString)
        console.log('connected to mongoDB')
    } catch (error) {
        console.log('error connecting to database',error)
        process.exit(1) //exits process when connection failed
    }


}


module.exports={
    connectToMongoDB
}