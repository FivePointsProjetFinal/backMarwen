var express = require('express');
var router = express.Router();

var User = require('../models/users');
var Todo = require('../models/todos');

const nodemailer = require("nodemailer");

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
      
      router.post('/deleteTodoUser/:idUser/:idTodo', (req, res, next) => {
       User.findOneAndUpdate(req.params.idUser ,{ $pull: { todos: { $in: [req.params.idTodo] } } },
        ).then(()=>
        {
          res.status(201).json({
            message: "DELTE successfully!",
          })
        }).catch((err)=> {
          res.status(400).json({
            error: err
          });
        });
        })
  
        router.get('/affichTodoUser/:idUser/:idTodo', (req, res, next) => {
          User.findById(req.params.idUser).populate('todos').then((t)=>
            {
              res.status(201).json({
                message: "successfully!",
                user: t.todos
              })
            }).catch((err)=> {
              res.status(400).json({
                error: err
              });
            });
            })

// async..await is not allowed in global scope, must use a wrapper
async function main() {
 
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'marwensghair95@gmail.com', // generated ethereal user
      pass: 'marwensghair1995', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "marwensghair95@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

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
