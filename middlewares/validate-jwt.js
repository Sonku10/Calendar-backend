const {response} = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response, next) =>{
    //x-token headers

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg:'no token, no entry'
        })
    }

    try {
        const payload = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED

        )
        console.log(payload)
        req.uid = payload.uid
        req.name = payload.name

    } catch (error) {
        if(!token){
            return res.status(401).json({
                ok: false,
                msg:'where did you get this?'
            })
        }
    }

    next()
}

module.exports = {
    validateJWT
}