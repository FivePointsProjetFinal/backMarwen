const mongoose =require('mongoose');

var schema = mongoose.Schema

var produitSchema =new schema({
refProduit: {type:String,required :true},
nameProduit : {type:String,required :true},
qteProduit : {type:Number,required :true},
prixDachat : {type:Number,required :true},
prixVente : {type:Number,required :true},
idFournisseur: {type:String,required :true},
idCat: {type:String,required :true},
})
module.exports=mongoose.model('produit',produitSchema);