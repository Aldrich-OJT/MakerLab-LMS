const asyncHandler = require("express-async-handler")
const UserData = require("../models/userDataModel")

const getuserData = asyncHandler(async(req, res)=>{
    const id = req.body.id

    const user = UserData.find(id)
    
    if(!user){
        throw new Error("no user found")
    }
    res.status(200).json(user)

})

const updateuserData = asyncHandler(async(req, res)=>{


})
const adduserData = asyncHandler(async(req,res)=>{


})

module.exports = {
    getuserData,
    updateuserData,
    adduserData,
}
