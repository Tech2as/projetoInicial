const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require('cors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();


app.use(express.json())
app.use(cors())
const db = mysql.createPool({
    host:  process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
const SECRET_KEY = 'teste';
// Login e cadastro

// Rota de registro
app.post('/registro', (req, res) => {
    const { nome, email, senha } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 8);

    db.query(
        'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, hashedPassword],
        (err, results) => {
            if (err) {
                console.error("Erro no servidor durante o registro:", err);
                return res.status(500).send({ success: false, message: 'Erro no servidor.' });
            }
            res.status(201).send({ success: true, message: 'Usuário registrado com sucesso!' });
        }
    );
});

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'Nenhum token fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Falha ao autenticar token.' });
        }
        req.userId = decoded.id;
        next();
    });
};


// Rota protegida de exemplo
app.get('/me', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'Token não fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Falha na autenticação do token.' });
        }

        db.query('SELECT * FROM usuario WHERE id = ?', [decoded.id], (err, results) => {
            if (err) {
                return res.status(500).send('Erro no servidor.');
            }
            if (results.length === 0) {
                return res.status(404).send('Usuário não encontrado.');
            }

            res.status(200).send(results[0]);
        });
    });
});

app.listen(3002, () =>{
    console.log("Rodando na porta 3002")
})