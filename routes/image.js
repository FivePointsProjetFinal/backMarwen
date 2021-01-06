var express = require('express')
var router = express.Router();

var multer  = require('multer')

var Image = require('../models/image');

const storage = multer.diskStorage({
destination: function(req, file, cb) {
  cb(null, './uploads/');
},
filename: function(req, file, cb) {
  cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
}
});

const fileFilter = (req, file, cb) => {
// reject a file
if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  cb(null, true);
} else {
  cb(null, false);
}
};

const upload = multer({
storage: storage,
limits: {
  fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
});

 
router.post('/uploadImage',upload.single('image'), async (req,res,next)=>{
  const image = new Image({
    image :req.file.path
  })
  await image.save()
  res.json(image)
  })
 


module.exports = router;