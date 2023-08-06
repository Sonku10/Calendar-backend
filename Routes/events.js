const {getEvents, createEvents, updateEvents, deleteEvents} = require('../controllers/events')
const { validateSpaces } = require('../middlewares/validate-spaces')
const { validateJWT } = require('../middlewares/validate-jwt')
const express = require('express')
const Router = express.Router
const {check} = require('express-validator')
const { isDate } = require('../helpers/isDate')

const router = Router()
//pass through jWT
router.use(validateJWT)

//get events

router.get('/', getEvents)

//create new event

router.post('/',[
    check('title', 'title is required dumbass').not().isEmpty(),
    check('start', 'when does it start moron').custom(isDate),
    validateSpaces
] , createEvents)

//update event

router.put('/:id', validateJWT,updateEvents)

//errase event
router.delete('/:id' ,deleteEvents)

module.exports = router