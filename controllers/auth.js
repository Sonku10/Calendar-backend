const express = require('express')
const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')


const createuser = async (req, res = express.response) => {

    const {name, email, password} = req.body



    // if (name.length < 5){
    //     return res.status(400).json ({
    //         ok:false,
    //         msg: 'El nombre debe de ser de 5 letras'
    //     })
    // }


    try {

        let user = await User.findOne({email})
        console.log(user)

        if (user){
            return res.status(400).json({
                ok:false,
                msg:'be original buddy'
            })
        }

        user = new User(req.body)

        //encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //generate token
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            msg: 'register',
            uid: user.id,
            name: user.name,
            token,
            // name, 
            // email,
            // password

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'get Fucked'
        })

    }

}

const loginUser = async(req, res = express.response) => {


    const { email, password } = req.body

    try {
        
        const user = await User.findOne({email})
        console.log(user)
        if (!user){
            return res.status(400).json({
                ok:false,
                msg:'you arent in the cool table'
            })
        }

        //check password
        const validpassword = bcrypt.compareSync(password, user.password)

        if (!validpassword){
            return res.status(400).json({
                ok:false,
                msg:'u sure this u pal?'
            })
        }

        //generar Token
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok: true,
            msg: 'login',
            uid: user.id,
            name: user.name,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'get Fucked'
        })
    }

}

const revalidarToken = async (req, res = express.response) => {

    const uid = req.uid
    const name = req.name
    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        msg: 'renew',
        uid,
        name,
        token
    })
}

module.exports = {
    createuser,
    loginUser,
    revalidarToken
}