const mongoose =require('mongoose');

var schema = mongoose.Schema

var userSchema =new schema({
firstName : {type:String,required :true},
lastName : {type:String,required :true},
telp : {type:String,required :true},
adresse : {type:String,required :true},
email  : {type:String,required :true},
password  : {type:String,required :true},
roleUser :{type:String,required :true},
})
module.exports=mongoose.model('user',userSchema);