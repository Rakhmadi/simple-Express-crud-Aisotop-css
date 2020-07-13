// @ts-ignore
const ex = require('express');
// @ts-ignore
const bodyParser =require('body-parser');
// @ts-ignore
const CORS =require('cors');
// @ts-ignore
const apiroute=require('../routes/api')
const app =ex();
app.use(ex.static('uploads'))
app.use(ex.static('Assets'))

//Midleware
app.use(bodyParser.json())
app.set('view engine', 'pug')
app.use(CORS())

app.use('/',apiroute)
 let port =1212
 app.listen(port,()=>console.log(`Server localhost:${port}`))