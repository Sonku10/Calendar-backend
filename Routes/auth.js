const express = require('express')
const Router = express.Router
const {check} = require('express-validator')

const{createuser,loginUser, revalidarToken} = require('../controllers/auth')
const { validateSpaces } = require('../middlewares/validate-spaces')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.post('/new', [
    //middlewares
    check('name', "name must be in").not().isEmpty(),
    check('email', "email must be in").isEmail(),
    check('password', "password must be of 6 chars").isLength({min:6}), 
    validateSpaces
] ,createuser)
    

router.post('/auth', [
    check('email', "email must be in").isEmail(),
    check('password', "password must be of 6 chars").isLength({min:6}),
    validateSpaces],
    loginUser)

router.get('/renew', validateJWT ,revalidarToken)

module.exports = router