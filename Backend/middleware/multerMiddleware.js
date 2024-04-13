const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Documents")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname)
    }
})

const singleUpload = multer({ storage: storage }).single('document');

const multipleUpload = multer({ storage: storage }).array('videos', 5);
module.exports = {
    singleUpload,
    multipleUpload
}