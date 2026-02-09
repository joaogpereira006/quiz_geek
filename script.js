const API_URL = 'https://quizgeek-production.up.railway.app/salvar';
let dadosUsuario = {};
let pontuacao = 0;
let perguntaAtual = 0;

const listaPersonagens = [
    "Aang Avatar", "Aerith Gainsborough", "Albus Dumbledore", "All Might My Hero Academia", "Angel Chainsaw Man", "Anya Forger", "Azula Avatar", "Batman DC", "Beast Boy DC", "Black Panther Marvel", "Black Widow Marvel", "Brainiac DC", "Bulma Dragon Ball", "Captain America", "Captain Marvel", "Catwoman DC", "Crona Soul Eater", "Deadpool Marvel", "Doctor Strange Marvel", "Double Trouble She-Ra", "Elektra Marvel", "En Dorohedoro", "Eren Yeager", "Erza Scarlet", "Gamora Marvel", "Goku Dragon Ball", "Hange Zoe Attack on Titan", "Harley Quinn DC", "Hercules Disney", "Hermione Granger", "Hinata Hyuga", "Human Torch Marvel", "Ichigo Kurosaki", "Iron Man Marvel", "Izuku Midoriya Deku", "Jack Sparrow", "Jane Foster Thor", "Jinx League of Legends", "Johnny Bravo", "Jonathan Joestar", "Jubilee Marvel", "Katara Avatar", "Katsuki Bakugo", "Kirby Nintendo", "Korra Avatar", "Kratos God of War", "L Death Note", "Lelouch Code Geass", "Lisa Simpson", "Luke Skywalker", "Mabel Pines Gravity Falls", "Maki Zenin Jujutsu Kaisen", "Makima Chainsaw Man", "Mereoleona Black Clover", "Michelangelo TMNT", "Mikasa Ackerman", "Monkey D Luffy", "Najimi Osana", "Nami One Piece", "Naruto Uzumaki", "Nezuko Kamado", "Nico Robin One Piece", "Nightwing DC", "Nobara Kugisaki", "omo Yaoyorozu", "Optimus Prime", "Orihime Inoue", "Pinkie Pie My Little Pony", "Power Chainsaw Man", "Princess Bubblegum", "Punisher Marvel", "Raven DC", "Raven Teen Titans", "Red Hood DC", "Rimuru Tempest", "Rock Lee Naruto", "Roronoa Zoro", "Ryuko Matoi Kill la Kill", "Sage Valorant", "Saitama One Punch Man", "Sakura Haruno", "Sasuke Uchiha", "Shazam DC", "She-Hulk Marvel", "Sherlock Holmes", "Spawn Image Comics", "Spider-Man Marvel", "Star Butterfly", "Starfire DC", "Star-Lord Marvel", "Stevonnie Steven Universe", "Supergirl DC", "Superman DC", "Tanjiro Kamado", "Testament Guilty Gear", "The Flash DC", "The Mask Dark Horse", "Thor Marvel", "Toph Beifong", "Tsunade Naruto", "Uncle Iroh Avatar", "Usagi Tsukino Sailor Moon", "Vegeta Dragon Ball", "Velma Dinkley", "Vision Marvel", "Winry Rockbell Fullmetal", "Wolverine", "Wonder Woman DC", "Yoruichi Shihouin"
];

const perguntas = [
    { texto: "QUAL SEU ESTILO DE COMBATE?", opcoes: ["FORÇA BRUTA", "ESTRATÉGIA", "TECNOLOGIA", "MAGIA"], pontos: [10, 5, 8, 7] },
    { texto: "O QUE TE MOTIVA?", opcoes: ["JUSTIÇA", "GLÓRIA", "ESTILO", "PAZ"], pontos: [10, 8, 2, 7] },
    { texto: "QUAL SEU AMBIENTE IDEAL?", opcoes: ["METRÓPOLIS", "GOTHAM", "ASGARD", "ESPAÇO"], pontos: [5, 10, 8, 9] },
    { texto: "ESCOLHA UM MENTOR:", opcoes: ["BATMAN", "SUPERMAN", "HOMEM DE FERRO", "THOR"], pontos: [10, 5, 8, 7] },
    { texto: "COMO LIDA COM FALHAS?", opcoes: ["TENTO DE NOVO", "ANALISO O ERRO", "MUDO O PLANO", "PEÇO AJUDA"], pontos: [5, 10, 8, 7] }
];

document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    dadosUsuario = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        genero: document.getElementById('genero').value
    };
    document.getElementById('secao-cadastro').style.display = 'none';
    document.getElementById('secao-quiz').style.display = 'block';
    mostrarPergunta();
});

function mostrarPergunta() {
    if (perguntaAtual < perguntas.length) {
        document.getElementById('num-pergunta').innerText = perguntaAtual + 1;
        document.getElementById('pergunta-texto').innerText = perguntas[perguntaAtual].texto;
        const divOpcoes = document.getElementById('opcoes-quiz');
        divOpcoes.innerHTML = '';
        perguntas[perguntaAtual].opcoes.forEach((opcao, index) => {
            const btn = document.createElement('button');
            btn.innerText = opcao;
            btn.className = 'btn-main';
            btn.onclick = () => {
                pontuacao += perguntas[perguntaAtual].pontos[index];
                perguntaAtual++;
                mostrarPergunta();
            };
            divOpcoes.appendChild(btn);
        });
    } else {
        exibirResultado();
    }
}

function exibirResultado() {
    document.getElementById('secao-quiz').style.display = 'none';
    document.getElementById('secao-resultado').style.display = 'block';
    
    // Sorteia o personagem baseado na pontuação
    let indice = pontuacao % listaPersonagens.length;
    let heroi = listaPersonagens[indice];

    document.getElementById('nome-personagem').innerText = heroi;
    document.getElementById('imagem-personagem').src = `fotos/${heroi}.jpg`; 

    document.getElementById('btn-concluir').onclick = async () => {
        const payload = {
            nome: dadosUsuario.nome,
            idade: dadosUsuario.idade,
            genero: dadosUsuario.genero,
            resultado_personagem: heroi,
            feedback: document.getElementById('feedback').value
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert("MISSÃO CUMPRIDA! DADOS SALVOS.");
                location.reload(); 
            }
        } catch (err) { 
            alert("ERRO AO SALVAR."); 
        }
    };
}