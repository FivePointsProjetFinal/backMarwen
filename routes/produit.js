var express = require('express');
var router = express.Router();
var Produit = require('../models/produit');

router.post('/addProduit', (req, res, next) => {
  const produit = new Produit(req.body)
  
  produit.save().then((u) => {
    console.log("user created");
    res.status(201).json({
      message: "user created",
      user: u
    })
  }).catch(err => {
    console.log(err);
  })
})
router.get('/allProduit', (req, res, next) => {
    Produit.find().then((p) => {
    res.status(200).json({
      message: "all users",
      produit: p
    })
  }).catch(err => {
    console.log(err);
  });
})

router.get('/Produit',async (req, res, next) => {
 var p= await  Produit.findOne({nameProduit:"pc dell"})

console.log(p._id);
})

router.get('/getProduitById/:id' , (req, res) => {
 
    Produit.findById(req.params.id).then((u) => {
     res.status(200).json({
       message: "all users",
       produit: u
     })
   }).catch(err => {
     console.log(err);
   });
 
});
 
 



router.delete('/deletProduit/:id', (req, res, next) => {
    Produit.deleteOne({ _id: req.params.id }).then(
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

router.put('/updateUser/:id', (req, res, next) => {
    Produit.findByIdAndUpdate(req.params.id,req.body).then(()=>
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










  module.exports = router;
