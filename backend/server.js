const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.listen(3002, () =>{
    console.log("Rodando na porta 3002")
})