const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
   
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '', 
    database: process.env.MYSQLDATABASE || 'railway',
    port: process.env.MYSQLPORT || 3306
});

db.connect(err => {
    if (err) {
        console.error('ERRO AO CONECTAR NO BANCO:', err);
    } else {
        console.log('SISTEMA ONLINE: CONEXÃO COM BANCO ESTABELECIDA!');
    }
});


app.post('/salvar', (req, res) => {
    const { nome, idade, genero, personagem, feedback } = req.body;
    
    
    const sql = "INSERT INTO cadastros (nome, idade, genero, resultado_personagem, feedback) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [nome, idade, genero, personagem, feedback], (err, result) => {
        if (err) {
            console.error("ERRO AO INSERIR NO BANCO:", err);
            res.status(500).send("Erro ao salvar dados");
        } else {
            console.log("SUCESSO: Novo registro inserido!");
            res.status(200).send("Salvo com sucesso");
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVIDOR ONLINE NA PORTA ${PORT}`);
});