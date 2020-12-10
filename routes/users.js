var express = require('express');
var router = express.Router();

var User = require('../models/users');
var Todo = require('../models/todos');
/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// })

router.post('/addUser', (req, res, next) => {
  const user = new User(req.body)
  user.save().then((u) => {
    console.log("user created");
    res.status(201).json({
      message: "user created",
      user: u
    })
  }).catch(err => {
    console.log(err);
  })
})
router.get('/allUsers',(req,res,next)=>{
   User.find().then((u) => {
    res.status(200).json({
      message: "all users",
      user: u
    })
  }).catch(err => {
    console.log(err);
  });
  })

  router.get('/getUserById/:id',(req,res)=>{
    User.findById(req.params.id).then((u) => {
      res.status(200).json({
        message: "all users",
        user: u
      })
    }).catch(err => {
      console.log(err);
    });
    })

    router.delete('/deletUser/:id', (req, res, next) => {
      User.deleteOne({_id: req.params.id}).then(
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

    router.put('/updateUser/:id',(req,res, next)=>{
      const UpdateUser =new User({
        _id:req.params.id,
        first_name:"ghassen",
        last_name:"abid",
         adress:"korba"
      });
      User.updateOne({_id:req.params.id},UpdateUser).then(()=>
      {
        res.status(201).json({
          message: "updated successfully!",
        })
      }).catch((err)=> {
        res.status(400).json({
          error: err
        });
      });
      })

      router.post('/affictTodoUser/:idUser/:idTodo', (req, res, next) => {
       Todo.findById(req.params.idTodo).then(todo=>{
        User.findOneAndUpdate(req.params.idUser , { $push: {todos : todo  } }
       ).then(()=>
       {
         res.status(201).json({
           message: "updated successfully!",
         })
       }).catch((err)=> {
         res.status(400).json({
           error: err
         });
       });
       })
      })

// router.post('/addUser', (req,res,next)=>{
// console.log(req.body);
// res.json(req.body);
// })
// router.get('/allUsers',(req,res,next)=>{
//   res.json({message:"all users"})
// })
// router.get('/getUserById/:id',(req,res,next)=>{
//   res.json({message:"user"+req.params.id})
// })

// router.put('/updateUser/:id',(req,res,next)=>{
//   res.json({message:"user"+req.params.id+"updated"})
// })

module.exports = router;
