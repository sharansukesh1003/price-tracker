const { User } = require('../models/userModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// constants
const secret = process.env.SECRET
const salt = process.env.SALT

// register user
router.post('/register', async (req, res) => {
    try {
        let userExists = await User.findOne({
            email: req.body.email
        })
        if ((userExists != null || userExists != undefined) && req.body.email == userExists.email) {
            return res.
            status(400).
            send({
                message: "E-mail already exits",
                success: false
            })
        }
        let user = User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, parseInt(salt)),
        })
        user = await user.save()
        if (!user) {
            return res
                .status(404)
                .send({
                    message: "The user could not be registered.",
                    success: false
                })
        } else {
            return res.
            status(200).
            send(user)
        }
    } catch (error) {
        console.log(error)
        return res
            .status(404)
            .send({
                message: "Something went wrong !",
                success: false
        })
    }
})

//login user
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    try {
        if (!user) {
            return res.
            status(400).
            send({
                message: "User not found",
                authentication: false
            })
        } else {
            if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
                const token = jwt.sign({
                        userId: user._id,
                        userName: user.name,
                    },
                    secret, {
                        expiresIn: '10d'
                    }
                )
                return res.
                status(200).
                send({
                    message: `Welcome back ${user.name}`,
                    userToken: token,
                    authentication: true
                })
            } else {
                return res.
                status(400).
                send({
                    message: "Incorrect Password",
                    authentication: false
                })
            }
        }
    } catch (err) {
        return res
            .status(400).
        send({
            message: "Something went wrong",
            authentication: false
        })
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id)
        if (user) {
            return res.
            status(200).
            send({
                message: "Succesfully removed user.",
                success: true
            })
        } else {
            return res.
            status(404).
            send({
                message: "user not found!",
                success: false
            })
        }
    } catch (err) {
        return res.
        status(400).
        send({
            error: err,
            success: false
        })
    }
})

module.exports = router;