var express = require('express');
var router = express.Router();

var Commande = require('../models/commande');

router.post('/addCommande', (req, res, next) => {
    const commande = new Commande(req.body)
    commande.save().then((u) => {
      console.log("user created");
      res.status(201).json({
        message: "user created",
        commande: u
      })
    }).catch(err => {
      console.log(err);
    })
  })


  router.get('/allCommande', (req, res, next) => {
    Commande.find().then((p) => {
      res.status(200).json({
        message: "all commande",
        commande: p
      })
    }).catch(err => {
      console.log(err);
    });
  })
  router.put('/valideCommabde/:id', (req, res, next) => {
    Commande.findByIdAndUpdate(req.params.id,{valide:true}).then(() =>{
        res.status(201).json({
          message: "fav updated",
        })
      }).catch(err => {
        console.log(err);
      })
  
      });
  
router.get('/getCommandebyid/:id' , (req, res) => {
 
  Commande.findById(req.params.id).then((u) => {
   res.status(200).json({
     message: "commande",
     commande: u
   })
 }).catch(err => {
   console.log(err);
 });

});
router.put('/updateCommande/:id', (req, res, next) => {
  Commande.findByIdAndUpdate(req.params.id,req.body).then(()=>
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

router.delete('/deletCommande/:id', (req, res, next) => {
  Commande.deleteOne({ _id: req.params.id }).then(
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