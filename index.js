//Configurações Iniciais do Index

const express = require ('express')
const mongoose = require ('mongoose')
require('dotenv').config()
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//Importando Arquivos de Rotas

const employeeRoutes = require('./routes/employeeRoutes')

app.use('/employee', employeeRoutes)

//Conectando ao MongoDB

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.4pjtgec.mongodb.net/bancodaapi?retryWrites=true&w=majority`
)
.then(()=>{
    console.log("Concectamos ao MongoDB")
    app.listen(3000)
})
.catch((err)=> console.log(err))
