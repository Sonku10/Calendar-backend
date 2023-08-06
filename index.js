const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config()
const cors = require('cors')



console.log(process.env)
//crear express
const app = express()

//database
dbConnection()

//cors
app.use(cors())

//public
app.use( express.static('public') )

//read and parse of the body
app.use(express.json())

//routes


//todo: auth // createm login, renew
app.use('/api/auth', require('./Routes/auth'))

app.use('/api/events', require('./Routes/events'))




//todo: Crud: events

//get petitions
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor Corriendo en puerto ${4000}`)
})