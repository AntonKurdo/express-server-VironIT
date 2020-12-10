const multer = require('multer');
const uuid = require('uuid');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/')
  },
  filename: (req, file, cb) => {
    const arr = file.originalname.split('.');
    cb(null, uuid.v4() + '.' + arr[arr.length-1]);
  }
});

module.exports = multer({storage: storageConfig}).single('filedata');