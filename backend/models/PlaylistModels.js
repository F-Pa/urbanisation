const mongoose = require('mongoose')

const playlistTemplate = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        ref: 'Utilisateur',
        required:true
    }
})

module.exports = Playlist = mongoose.model('Playlist', playlistTemplate)
