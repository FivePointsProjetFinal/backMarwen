const mongoose =require('mongoose');

var schema = mongoose.Schema

var ImageSchema =new schema({
image:{type:String,required :true},

})

module.exports=mongoose.model('image',ImageSchema);