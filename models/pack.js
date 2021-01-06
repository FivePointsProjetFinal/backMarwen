const mongoose = require('mongoose');

var schema = mongoose.Schema

var packSchema = new schema({
    refPack: { type: String },
    namePack: { type: String},
    produits: { type: Array }
})

module.exports = mongoose.model('pack', packSchema);