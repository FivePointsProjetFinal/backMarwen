var express = require('express');
var router = express.Router();
var Categorie = require('../models/categorie');

router.post('/addCategorie', (req, res, next) => {
    const categorie = new Categorie(req.body)
    
    categorie.save().then((u) => {
      console.log("Fournisseur created");
      res.status(201).json({
        message: "Fournisseur created",
        cat: u
      })
    }).catch(err => {
      console.log(err);
    })
  })
  router.get('/allCategorie', (req, res, next) => {
    Categorie.find().then((p) => {
      res.status(200).json({
        message: "all categorie",
        cat: p
      })
    }).catch(err => {
      console.log(err);
    });
  })
  
  
router.get('/getCatbyid/:id' , (req, res) => {
 
  Categorie.findById(req.params.id).then((u) => {
   res.status(200).json({
     message: "all users",
     cat: u
   })
 }).catch(err => {
   console.log(err);
 });

});
router.put('/updateCategorie/:id', (req, res, next) => {
  Categorie.findByIdAndUpdate(req.params.id,req.body).then(()=>
{
  res.status(201).json({
    message: "updated successfully!",
  })
}).catch((err)=> {
  res.status(400).json({
    error: err
  });
});  
});

router.delete('/deletCat/:id', (req, res, next) => {
  Categorie.deleteOne({ _id: req.params.id }).then(
  () => {
    res.status(200).json({
      message: 'Deleted!'
    });
  }
).catch(
  (error) => {
    res.status(500).json({
      error: error
    });
  }
);
});

  module.exports = router;