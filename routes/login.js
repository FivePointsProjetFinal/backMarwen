var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
var User = require('../models/users');

router.post('/login', (req, res, next) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            console.log(user);
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            return res.status(200).json({
                message: "Auth successful",
                token: token,
                user:user.roleUser
            });
        }
        res.status(401).json({
            message: "Auth failed"
        });
    });
})



module.exports = router;