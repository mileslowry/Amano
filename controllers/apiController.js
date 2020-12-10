"use strict";

const jwt = require('jsonwebtoken');
const Style = require('../models/stache-style');

module.exports = {
    getToken: (req, res) => {
        let signedToken = jwt.sign({
            expiresIn: '24h'
        },'secret');
        res.json({API_Key: signedToken});
    },

    getStyles: (req, res) => {
        Style.find({}).then((styles) => {
            res.json({styles: styles});
        }).catch((err) => {
            next(err);
        })
    },

    verifyToken: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
            jwt.verify(token)
            .then(next)
            .catch(error => {
                console.log(`Error with token: ${error.message}`);
                next();
            });
        } else {
            next();
        }
    }
}