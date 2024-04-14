const express = require('express');
const router = express.Router();
const { userLogin, userRegister, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { getuserData,updateuserData, adduserData } = require('../controllers/userDataController');

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/me", protect,getUser);

router.get("/data/:userID",getuserData)
router.post("/data/add/:userID",adduserData)
router.put("/data/update/:userID",updateuserData)


module.exports = router; 