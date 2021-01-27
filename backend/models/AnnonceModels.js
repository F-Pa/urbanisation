const mongoose = require('mongoose')

const annonceTemplate = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        ref: 'Utilisateur',
        required:true
    },
    category:{
        type:String, 
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports = Annonce = mongoose.model('Annonce', annonceTemplate)