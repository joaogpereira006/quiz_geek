const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// CONFIGURAÇÃO DO SEU BANCO (Visto no seu print do Workbench)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Verifique se sua senha do MySQL não é vazia
    password: '', 
    database: 'projeto_geek'
});

db.connect(err => {
    if (err) {
        console.error('ERRO AO CONECTAR NO MYSQL:', err);
    } else {
        console.log('ESTRUTURA PRONTA: BANCO CONECTADO COM SUCESSO!');
    }
});

// ROTA PARA SALVAR OS DADOS
app.post('/salvar', (req, res) => {
    const { nome, idade, genero, personagem, feedback } = req.body;
    
    // O nome da tabela é 'cadastros', como no seu print
    const sql = "INSERT INTO cadastros (nome, idade, genero, resultado_personagem, feedback) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [nome, idade, genero, personagem, feedback], (err, result) => {
        if (err) {
            console.error("ERRO AO INSERIR NO BANCO:", err);
            res.status(500).send("Erro ao salvar dados");
        } else {
            console.log("SUCESSO: Novo herói registrado no banco!");
            res.status(200).send("Salvo com sucesso");
        }
    });
});

app.listen(3000, () => {
    console.log('SERVIDOR RODANDO NA PORTA 3000');
});