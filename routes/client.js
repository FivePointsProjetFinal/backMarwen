var express = require('express');
var router = express.Router();
var Client = require('../models/client');

router.post('/addClient', (req, res, next) => {
    const client = new Client(req.body)
    client.save().then((u) => {
      console.log("user created");
      res.status(201).json({
        message: "user created",
        user: u
      })
    }).catch(err => {
      console.log(err);
    })
  })
  router.get('/allClients', (req, res, next) => {
    Client.find().then((u) => {
      res.status(200).json({
        message: "all Clients",
        user: u
      })
    }).catch(err => {
      console.log(err);
    });
  })
  router.get('/getClientById/:id' , (req, res) => {
 
    Client.findById(req.params.id).then((u) => {
      res.status(200).json({
        message: "all users",
        user: u
      })
    }).catch(err => {
      console.log(err);
    });
  
 });

 router.put('/updateClient/:id', (req, res, next) => {
    Client.findByIdAndUpdate(req.params.id,req.body).then(()=>
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

  router.put('/updateFav/:id', (req, res, next) => {
    Client.findById(req.params.id).then((user) =>{
      user.favorisClient = !user.favorisClient; 
      user.save().then((u) => {
        res.status(201).json({
          message: "fav updated",
          user: u
        })
      }).catch(err => {
        console.log(err);
      })
    })
      });
      router.get("/getFavoritClient", async (req,res,next)=>{
        Client.find({favorisClient:true}).then((u) => {
          res.status(200).json({
            message: "all users",
            user: u
          })
        }).catch(err => {
          console.log(err);
        }); 
      });
      router.delete('/deletClient/:id', (req, res, next) => {
        Client.deleteOne({ _id: req.params.id }).then(
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
 