'use strict'

const mongoose = require('mongoose');
const User = require('../models/users');

function sigUp (req, res) {
    const user = new User({
        name: req.body.name,
        password: req.body.password,
    })
}

function sigIn (req, res) {

}

module.exports = {
    sigIn,
    sigUp
}