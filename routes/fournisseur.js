var express = require('express');
var router = express.Router();
var Fournisseur = require('../models/fournisseur');

router.post('/addFournisseur', (req, res, next) => {
  const produit = new Fournisseur(req.body)
  
  produit.save().then((u) => {
    console.log("Fournisseur created");
    res.status(201).json({
      message: "Fournisseur created",
      fournisseur: u
    })
  }).catch(err => {
    console.log(err);
  })
})
router.get('/allFournisseur', (req, res, next) => {
    Fournisseur.find().then((p) => {
    res.status(200).json({
      message: "all Fournisseur",
      fournisseur: p
    })
  }).catch(err => {
    console.log(err);
  });
})



router.get('/getFournisseurById/:id' , (req, res) => {
 
    Fournisseur.findById(req.params.id).then((u) => {
     res.status(200).json({
       message: "all users",
       fournisseur: u
     })
   }).catch(err => {
     console.log(err);
   });
 
});
 
router.delete('/deletFournisseur/:id', (req, res, next) => {
  Fournisseur.deleteOne({ _id: req.params.id }).then(
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

router.put('/updateFournisseur/:id', (req, res, next) => {
    Fournisseur.findByIdAndUpdate(req.params.id,req.body).then(()=>
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
router.put('/updateFavF/:id', (req, res, next) => {
  Fournisseur.findById(req.params.id).then((user) =>{
    user.favorisFournisseur = !user.favorisFournisseur; 
    user.save().then((u) => {
      res.status(201).json({
        message: "fav updated",
        fournisseur: u
      })
    }).catch(err => {
      console.log(err);
    })
  })
    });
    router.get("/getFavoritF", async (req,res,next)=>{
      Fournisseur.find({favorisFournisseur:true}).then((u) => {
        res.status(200).json({
          message: "all users",
          fournisseur: u
        })
      }).catch(err => {
        console.log(err);
      });
  

    });

  module.exports = router;
