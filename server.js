const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.MYSQLHOST || 'mysql.railway.internal', 
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD, 
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

// Rota de teste para ver se o link abre no navegador
app.get('/', (req, res) => {
    res.send("Servidor do Quiz Geek está online e pronto!");
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

// CONFIGURAÇÃO CRÍTICA PARA O RAILWAY
const PORT = process.env.PORT || 3000;
// Usar "0.0.0.0" permite que o Railway encontre seu servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`);
});