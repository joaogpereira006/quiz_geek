const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   
    host: 'mysql.railway.internal', 
    user: 'root',
    password: process.env.MYSQLPASSWORD, 
    database: 'railway',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('ERRO AO CONECTAR NO BANCO:', err);
    } else {
        console.log('SISTEMA ONLINE: CONEXÃO COM BANCO ESTABELECIDA!');
    }
});

app.get('/', (req, res) => {
    res.send('Servidor do Quiz Geek está online e pronto!');
});

app.post('/salvar', (req, res) => {
    
    const { nome, idade, genero, resultado_personagem, feedback } = req.body;
    
    const sql = "INSERT INTO cadastros (nome, idade, genero, resultado_personagem, feedback) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [nome, idade, genero, resultado_personagem, feedback], (err, result) => {
        if (err) {
            console.error("ERRO AO SALVAR NO BANCO:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Dados salvos com sucesso!" });
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`);
});