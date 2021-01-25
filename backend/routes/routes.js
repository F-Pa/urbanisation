const express = require('express');
const bcrypt = require('bcrypt');
const assert = require('assert');

const User = require('../models/UsersModels')
const Playlist = require('../models/PlaylistModels')

const router = express.Router()

const saltRound = 10;

router.post('/signup', async(req, res) => {
    
    const securePassword = await bcrypt.hash(req.body.password, saltRound)
    
    try {
        assert.notStrictEqual("", req.body.nom, 'Nom Requis');
        assert.notStrictEqual("", req.body.prenom, 'Prénom Requis');
        assert.notStrictEqual("", req.body.age, 'Age Requis');
        assert.notStrictEqual("", req.body.email, 'Email Requis');
        assert.notStrictEqual("", req.body.password, 'Mot de passe Requis');
    }
    catch (bodyError) {
        return res.status(403).json({status: 'error', message: bodyError.message});
    }

    const user = new User({
        nom:req.body.nom,
        prenom:req.body.prenom,
        age:req.body.age,
        role:req.body.role,
        email:req.body.email,
        password:securePassword,
    })
    User.exists({ email: req.body.email }, function (err, users) {
        if(err) return console.log(err);
        if(users){
            return res.status(403).json({status: 'error', message: 'L\'utilisateur existe déjà'});
        }
        else{
            user.save()
                .then(data => {
                    res.json(data)
                })
                .catch(error => {
                    res.json(error)
                })
            return res.json({token: 'test2'})
        }
    })
})

router.post('/signin', (req, res) => {
    try {
        assert.notStrictEqual("", req.body.emailLogin, 'Email requis');
        assert.notStrictEqual("", req.body.passwordLogin, 'Mot de passe requis');
    }
    catch (bodyError) {
        return res.status(403).json({status: 'error', message: bodyError.message});
    }

    User.exists({ email: req.body.emailLogin }, function(err, users) {
        if(err) return console.log(err);
        if(users){
            User.findOne({ email: req.body.emailLogin }, 'email password', function(err, call) {
                if(err) return console.log(err);
                bcrypt.compare(req.body.passwordLogin, call.password, function(err, match) {
                    if(err) return res.status(500).json({status: 'error', message: 'Authentification échouée'});
                    if(match) {
                        console.log(call._id);
                        return res.json({token : call._id});
                    }
                    else {
                        return res.status(401).json({status: 'error', message: 'L\'email ou le mot de passe n\'existe pas'})
                    }
                })
            })
        }   
        else {
            return res.status(401).json({status: 'error', message: 'L\'email ou le mot de passe n\'existe pas'});
        }
    })
})

router.post('/playlist', (req, res) => {
    try {
        assert.notStrictEqual("", req.body.nom, 'Veuillez spécifier le nom de la Playlist');
    }
    catch (bodyError) {
        return res.status(403).json({status: 'error', message: bodyError.message});
    }

    const playlist = new Playlist({
        nom: req.body.nom, 
        user_id: req.body.user_id
    })

    Playlist.exists({ nom: req.body.nom, user_id: req.body.user_id }, function (err, users) {
        if(err) return console.log(err);
        if(users){
            console.log('paiehu ');
            return res.status(403).json({status: 'error', message: 'Une playlist est déjà nommée ainsi'});
        }
        else{
            console.log('iav');
            playlist.save()
                .then(data => {
                    res.json(data)
                })
                .catch(error => {
                    console.log(error);
                    res.json(error)
                })
        }
    })
})

router.post('/getPlaylist', (req, res) => {
    Playlist.find({user_id: req.body.user_id}, function(err, call) {
        if(err) return console.log(err);
        const play = [];
        for(const i in call) {
            play.push(call[i].nom);
        }
        return res.json(play);
    })
})

module.exports = router