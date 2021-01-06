const mongoose =require('mongoose');

var schema = mongoose.Schema

var categorieSchema =new schema({
refCat:{type:String,required :true},
nameCat:{type:String,required :true},
})

module.exports=mongoose.model('categorie',categorieSchema);