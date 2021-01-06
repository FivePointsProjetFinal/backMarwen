const mongoose = require('mongoose');

var schema = mongoose.Schema

var commandeSchema = new schema({
    refCommande: { type: String },
    montant_total: { type: String },
    idClient: { type: String},
    date_commande: { type: Date},
    produitRows: { type: Array },
    valide:{type:Boolean}
})

module.exports = mongoose.model('commande', commandeSchema);