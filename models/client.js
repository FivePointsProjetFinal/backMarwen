const mongoose =require('mongoose');

var schema = mongoose.Schema

var ClientSchema =new schema({
nameClient :{type:String,required :true},
telpClient :{type:String,required :true},
faxClient  :{type:String,required :true},
adresseClient  :{type:String,required :true},
emailClient :{type:String,required :true},
modepaimentClient:{type:String,required :true},
villeClient  :{type:String,required :true},
typeClient  :{type:String,required :true},
favorisClient :{type:Boolean},
refClient :{type:String,required :true},
})
module.exports=mongoose.model('client',ClientSchema);