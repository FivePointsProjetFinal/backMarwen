var express = require('express')
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'upload/' })
var Image = require('../models/image');

var app = express()
 
router.post('/profile', upload.single('image'),(req,res,next)=> {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  Image = req.file
  if (!Image) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(Image)
  
})
 


module.exports = router;