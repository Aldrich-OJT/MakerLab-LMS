const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User =  require('../models/userModel')
const protect = asyncHandler(async(req, res, next)=>{

    let token


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ 
        try {
            token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            //console.log(decoded)
            next()
        } catch (error) {
            //console.log("error",error)
            res.status(404).json({message: "Not authorized"})
            // throw new Error('Not authorized')
            
        }
    }
    if(!token){
        res.status(404).json({message: "Not authorized, no token"})
        // throw new Error('Not authorized, no token')
    }
})

module.exports= {
    protect
}