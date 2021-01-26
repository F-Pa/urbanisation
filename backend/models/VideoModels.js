const mongoose = require('mongoose')

const videoTemplate = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        ref: 'Utilisateur',
        required:true
    },
    playlist_name:{
        type:String,
        required:true
    }
})

module.exports = Video = mongoose.model('Video', videoTemplate)