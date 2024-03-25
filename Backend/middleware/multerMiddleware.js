const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images")
    },
    filename: (req, file, cb) => {
        console.log(file)
        console.log(file.originalname)
        cb(null, file.originalname)
    }
})

const singleUpload = multer({ storage: storage }).single('video');
const multipleUpload = multer({ storage: storage }).array('videos', 5);
module.exports = {
    singleUpload,
    multipleUpload
}