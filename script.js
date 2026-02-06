let user = {};
let score = { a: 0, b: 0, c: 0, d: 0, e: 0 };
let currentQ = 0;

const questions = [
    { p: "Qual seu estilo de resolver problemas?", a: "Estratégia e lógica", b: "Força bruta e coragem", c: "Diplomacia e bondade", d: "Ação direta e eficaz", e: "Criatividade e improviso" },
    { p: "O que te move?", a: "Conhecimento", b: "Superação", c: "Justiça", d: "Poder/Mudança", e: "Liberdade" },
    { p: "Escolha um local para sua base:", a: "Laboratório tecnológico", b: "Dojo de treino", c: "Refúgio na floresta", d: "Beco sombrio", e: "Parque de diversões" },
    { p: "Como você lida com um inimigo?", a: "Prevejo seus passos", b: "Encaro de frente", c: "Tento redimi-lo", d: "Uso as sombras", e: "Confundo ele" }
];

const bancoLemas = {
    a: ["Saber é poder", "A mente vence a espada", "A lógica é o único caminho"],
    b: ["Nunca recuar, nunca render-se", "A dor é temporária", "Quebre todos os seus limites"],
    c: ["Paz acima de tudo", "Gentileza gera força", "Justiça com misericórdia"],
    d: ["Justiça a qualquer custo", "Nas sombras eu governo", "Sozinho eu sou a lei"],
    e: ["Aproveite o caos", "A vida é uma piada", "Nada é proibido"]
};

const banco = {
    Masculino: {
        a: ["Batman DC", "Iron Man Marvel", "L Death Note", "Sherlock Holmes", "Doctor Strange Marvel", "Vision Marvel", "Nightwing DC", "Albus Dumbledore", "Lelouch Code Geass", "Brainiac DC"],
        b: ["Goku Dragon Ball", "Naruto Uzumaki", "Monkey D Luffy", "Thor Marvel", "Spider-Man Marvel", "Superman DC", "Ichigo Kurosaki", "All Might My Hero Academia", "Rock Lee Naruto", "Human Torch Marvel"],
        c: ["Tanjiro Kamado", "Captain America", "Optimus Prime", "Aang Avatar", "Luke Skywalker", "Jonathan Joestar", "Hercules Disney", "Uncle Iroh Avatar", "Izuku Midoriya Deku", "Black Panther Marvel"],
        d: ["Vegeta Dragon Ball", "Wolverine Marvel", "Sasuke Uchiha", "Punisher Marvel", "Kratos God of War", "Spawn Image Comics", "Red Hood DC", "Katsuki Bakugo", "Roronoa Zoro", "Eren Yeager"],
        e: ["Deadpool Marvel", "Saitama One Punch Man", "Jack Sparrow", "The Flash DC", "Star-Lord Marvel", "The Mask Dark Horse", "Johnny Bravo", "Beast Boy DC", "Shazam DC", "Michelangelo TMNT"]
    },
    Feminino: {
        a: ["Lisa Simpson", "Hermione Granger", "Bulma Dragon Ball", "Raven DC", "Makima Chainsaw Man", "Princess Bubblegum", "Sage Valorant", "Nico Robin One Piece", "Velma Dinkley", "Annabelle Doll"],
        b: ["Wonder Woman DC", "Captain Marvel", "Sakura Haruno", "Erza Scarlet", "Korra Avatar", "She-Hulk Marvel", "Maki Zenin Jujutsu Kaisen", "Tsunade Naruto", "Mereoleona Black Clover", "Ryuko Matoi Kill la Kill"],
        c: ["Hinata Hyuga", "Nezuko Kamado", "Katara Avatar", "Supergirl DC", "Orihime Inoue", "Winry Rockbell Fullmetal", "Momo Yaoyorozu", "Starfire DC", "Aerith Gainsborough", "Jane Foster Thor"],
        d: ["Jinx League of Legends", "Mikasa Ackerman", "Black Widow Marvel", "Catwoman DC", "Elektra Marvel", "Yoruichi Shihouin", "Nobara Kugisaki", "Gamora Marvel", "Raven Teen Titans", "Azula Avatar"],
        e: ["Harley Quinn DC", "Power Chainsaw Man", "Pinkie Pie My Little Pony", "Star Butterfly", "Anya Forger", "Jubilee Marvel", "Mabel Pines Gravity Falls", "Toph Beifong", "Nami One Piece", "Usagi Tsukino Sailor Moon"]
    },
    "Não-binário": {
        a: ["Double Trouble She-Ra", "Hange Zoe Attack on Titan"],
        b: ["Najimi Osana", "En Dorohedoro"],
        c: ["Crona Soul Eater", "Angel Chainsaw Man"],
        d: ["Testament Guilty Gear", "Stevonnie Steven Universe"],
        e: ["Rimuru Tempest", "Kirby Nintendo"]
    }
};

document.getElementById('form-cadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    user = { 
        nome: document.getElementById('nome').value, 
        idade: document.getElementById('idade').value, 
        genero: document.getElementById('genero').value 
    };
    document.getElementById('secao-cadastro').style.display = 'none';
    document.getElementById('secao-quiz').style.display = 'block';
    showQuestion();
});

function showQuestion() {
    const quizContainer = document.getElementById('opcoes-quiz');
    const textoPergunta = document.getElementById('pergunta-texto');
    const numDisplay = document.getElementById('num-pergunta');

    // Perguntas 1 a 4
    if (currentQ < questions.length) {
        numDisplay.innerText = currentQ + 1;
        const q = questions[currentQ];
        textoPergunta.innerText = q.p;
        let html = "";
        ['a','b','c','d','e'].forEach(l => {
            html += `<button class="btn-option" onclick="answer('${l}')">${q[l]}</button>`;
        });
        quizContainer.innerHTML = html;
    } 
    // Pergunta 5 (Lemas)
    else if (currentQ === questions.length) {
        numDisplay.innerText = 5;
        textoPergunta.innerText = "Escolha o lema que define sua jornada:";
        let html = "";
        ['a','b','c','d','e'].forEach(l => {
            const lista = bancoLemas[l];
            const frase = lista[Math.floor(Math.random() * lista.length)];
            html += `<button class="btn-option" onclick="answer('${l}')">${frase}</button>`;
        });
        quizContainer.innerHTML = html;
    } 
    // Tela de Revelação
    else {
        document.querySelector('.quiz-header').style.display = 'none';
        textoPergunta.innerText = "Análise de perfil concluída!";
        quizContainer.innerHTML = `<button onclick="calcResult()" class="btn-main">PRÓXIMO PASSO</button>`;
    }
}

function answer(l) { 
    score[l]++; 
    currentQ++; 
    showQuestion(); 
}

function calcResult() {
    const winner = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
    let gen = (user.genero === "Masculino" || user.genero === "Feminino") ? user.genero : "Não-binário";
    const listaFinal = banco[gen][winner];
    const charName = listaFinal[Math.floor(Math.random() * listaFinal.length)];

    // Caminho da sua pasta local de fotos
    const charImgUrl = `fotos/${charName}.jpg`;

    document.getElementById('secao-quiz').style.display = 'none';
    const resSec = document.getElementById('secao-resultado');
    resSec.style.display = 'block';

    resSec.innerHTML = `
        <h2 class="subtitulo">HERÓI IDENTIFICADO:</h2>
        <div class="char-name-highlight">${charName.toUpperCase()}</div>
        <div class="img-container">
            <img src="${charImgUrl}" class="char-img" onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=${charName}'">
            <div class="comic-bang">BANG!</div>
        </div>
        <div style="text-align:left; margin-top:10px;">
            <label style="font-weight:bold;">NOTAS DO OBSERVADOR:</label>
            <textarea id="feedback" placeholder="O que achou desse resultado?"></textarea>
        </div>
        <button onclick="saveAndFinish('${charName}')" class="btn-main">CONCLUIR REGISTRO</button>
    `;
}

async function saveAndFinish(char) {
    const feedbackText = document.getElementById('feedback').value;
    
    // Objeto com nomes exatos para o MySQL
    const dadosParaSalvar = {
        nome: user.nome,
        idade: user.idade,
        genero: user.genero,
        personagem: char,
        feedback: feedbackText
    };

    try {
        const response = await fetch('http://localhost:3000/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaSalvar)
        });

        if (response.ok) {
            alert("REGISTRO SALVO COM SUCESSO NO BANCO!");
            location.reload(); 
        } else {
            alert("Erro ao salvar. Verifique o terminal do Node.");
        }
    } catch (e) {
        console.error("Erro:", e);
        alert("SERVIDOR OFF: O Node.js está rodando?");
    }
}