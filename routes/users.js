var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var User = require('../models/users');
var Todo = require('../models/todos');
const jwtsecure =require('../jwtsecure/jwt')
const nodemailer = require("nodemailer");

router.post('/addUser',jwtsecure.ensureToken, (req, res, next) => {
  jwt.verify(req.token,process.env.JWT_KEY,(err,data)=>{
    if (err) {
      res.status(401).json({
        message: "token non valid"
      })
    }
    else{
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
    }
  })
  async function main() {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'marwensghair95@gmail.com',
        pass: 'YOUR_PASSWORD_hERE'
      }
    });
    
    let info = await transporter.sendMail({
      from: ' <marwensghair95@gmail.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Information de Mon stock ✔", // Subject line
      text: "Hello?", // plain text body
      html: " hello <b>"+req.body.firstName+"</b> votre login est <b>"+req.body.email +" </b>votre mot de passe est <b>" +req.body.password+"</b>" , // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
})
router.get('/allUsers',jwtsecure.ensureToken, (req, res, next) => {
  jwt.verify(req.token,process.env.JWT_KEY,(err,data)=>{
    if (err) {
      res.status(401).json({
        message: "token non valid"
      })
    }
    else{
  User.find().then((u) => {
    res.status(200).json({
      message: "all users",
      user: u
    })
  }).catch(err => {
    console.log(err);
  });
}
})
})


router.get('/getUserById/:id',jwtsecure.ensureToken , (req, res) => {
 jwt.verify(req.token,process.env.JWT_KEY,(err,data)=>{
if (err) {
  res.status(401).json({
    message: "token non valid"
  })
}
else{
  User.findById(req.params.id).then((u) => {
    res.status(200).json({
      message: "all users",
      user: u
    })
  }).catch(err => {
    console.log(err);
  });
}
 })

})



router.delete('/deletUser/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(
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
  User.findByIdAndUpdate(req.params.id,req.body).then(()=>
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


router.post('/affictTodoUser/:idUser/:idTodo', (req, res, next) => {
  Todo.findById(req.params.idTodo).then(todo => {
    User.findOneAndUpdate(req.params.idUser, { $push: { todos: todo } }
    ).then(() => {
      res.status(201).json({
        message: "updated successfully!",
      })
    }).catch((err) => {
      res.status(400).json({
        error: err
      });
    });
  })
})

router.post('/deleteTodoUser/:idUser/:idTodo', (req, res, next) => {
  User.findOneAndUpdate(req.params.idUser, { $pull: { todos: { $in: [req.params.idTodo] } } },
  ).then(() => {
    res.status(201).json({
      message: "DELTE successfully!",
    })
  }).catch((err) => {
    res.status(400).json({
      error: err
    });
  });
})

router.get('/affichTodoUser/:idUser/:idTodo', (req, res, next) => {
  User.findById(req.params.idUser).populate('todos').then((t) => {
    res.status(201).json({
      message: "successfully!",
      user: t.todos
    })
  }).catch((err) => {
    res.status(400).json({
      error: err
    });
  });
})

router.post('/sentMail', (req, res, next) => {
  let mail=[]
  User.find().then((u) => {
    u.forEach(e => {

     console.log(e.email);
       mail.push(e.email);

    });
    console.log(mail);
})
  async function main() {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'marwensghair95@gmail.com',
        pass: 'marwensghair1995'
      }
    });
    
    let info = await transporter.sendMail({
      from: ' <marwensghair95@gmail.com>', // sender address
      to: mail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello hazem?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});


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
