const mongoose =require('mongoose');

var schema = mongoose.Schema

var userSchema =new schema({
first_name:{type:String,required :true},
last_name:{type:String,required :true},
email:{type:String,required :true},
todos:[{type:mongoose.Schema.Types.ObjectId, ref:'todo'}]
})
module.exports=mongoose.model('user',userSchema);