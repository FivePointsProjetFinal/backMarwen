var express = require('express');
var router = express.Router();

var Todo = require('../models/todos');

router.post('/addTodo', (req, res, next) => {
    const toDo = new Todo(req.body)
    toDo.save().then((t) => {
      console.log("todo created");
      res.status(201).json({
        message: "todo created",
        user: t
      })
    }).catch(err => {
      console.log(err);
    })
  })
router.put('/updateTodo/:id',(req,res,next) =>{
  Todo.findByIdAndUpdate(req.params.id,req.body).then(()=>
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

router.delete('/deletTodo/:id',async (req, res, next) => {
await Todo.findByIdAndDelete(req.params.id).exec()
 res.json({
message:"deleted"
 })
});


module.exports = router;
