const express = require('express');
const assert = require('assert');
const bcrypt = require('bcrypt');

const userTemplateCopy = require('../models/UsersModels')

const router = express.Router()

router.post('/signup', async (req, res) => {

    const saltRound = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltRound)

    const user = new userTemplateCopy({
        nom:req.body.nom,
        prenom:req.body.prenom,
        age:req.body.age,
        email:req.body.email,
        password:securePassword,
    })
    user.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })

})

module.exports = router
