var express = require('express');
var router = express.Router();
var Pack = require('../models/pack');
var Produit = require('../models/produit');

router.post('/addPack', (req, res, next) => {
  const pack = new Pack({
    refPack:req.body.refPack,
    namePack:req.body.namePack,
    produits: req.body.produits,
  })
  // req.body.produits.forEach(async element => {
  //   var p = await Produit.findOne({nameProduit:element}).exec();
  //    console.log(p._id);
  //  pack.produits.push(p._id);
   
  // })
 
    

    pack.save().then((u) => {
      console.log("pack created");
      res.status(201).json({
        message: "pack created",
        cat: u
      })
    }).catch(err => {
      console.log(err);
    })
  })
  router.get('/allPack', (req, res, next) => {
    Pack.find().then((p) => {
      res.status(200).json({
        message: "all categorie",
        pack: p
      })
    }).catch(err => {
      console.log(err);
    });
  })
  
  
router.get('/getCatbyid/:id' , (req, res) => {
 
    Pack.findById(req.params.id).then((u) => {
   res.status(200).json({
     message: "all users",
     cat: u
   })
 }).catch(err => {
   console.log(err);
 });

});
router.put('/updateCategorie/:id', (req, res, next) => {
    Pack.findByIdAndUpdate(req.params.id,req.body).then(()=>
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
    Pack.deleteOne({ _id: req.params.id }).then(
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