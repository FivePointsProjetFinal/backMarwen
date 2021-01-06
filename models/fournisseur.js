const mongoose =require('mongoose');

var schema = mongoose.Schema

var FournisseurSchema =new schema({
nameFournisseur :{type:String,required :true},
telpFournisseur :{type:String,required :true},
faxFournisseur :{type:String,required :true},
adresseFournisseur  :{type:String,required :true},
emailFournisseur :{type:String,required :true},
modepaimentFournisseur:{type:String,required :true},
villeFournisseur  :{type:String,required :true},
typeFournisseur  :{type:String,required :true},
favorisFournisseur :{type:Boolean},
refFournisseur :{type:String,required :true},
})

module.exports=mongoose.model('fournisseur',FournisseurSchema);