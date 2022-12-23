const { Router } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const route = require('./src/route/routes')
const app = express()


app.use(express.json())

mongoose.connect('mongodb+srv://ShadaabIqbal:SHYihabvgthRfy3z@mycluster.cuj3crc.mongodb.net/customerCard', {useNewUrlParser: true}, mongoose.set('strictQuery', false))
.then(() => {console.log('mongoDB is connected')})
.catch((err) => {console.log(err.message)})

app.use('/', route)

app.listen(process.env.PORT || 3000, function(){
    console.log('Express app running on port'+' '+(process.env.PORT || 3000))
})