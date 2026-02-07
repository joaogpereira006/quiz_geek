
const API_URL = 'https://quizgeek-production.up.railway.app/salvar';


async function finalizarQuiz() {
    
    const dadosParaEnviar = {
        nome: document.getElementById('nome').value,
        idade: document.getElementById('idade').value,
        genero: document.getElementById('genero').value,
        personagem: "Resultado do Quiz", 
        feedback: document.getElementById('feedback')?.value || "Sem feedback"
    };

    console.log("Tentando enviar dados...", dadosParaEnviar);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: dadosParaEnviar.nome,
                idade: dadosParaEnviar.idade,
                genero: dadosParaEnviar.genero,
                resultado_personagem: dadosParaEnviar.personagem,
                feedback: dadosParaEnviar.feedback
            })
        });

        if (response.ok) {
            const resultado = await response.json();
            alert("✅ Sucesso: " + resultado.message);
            
        } else {
            const erro = await response.json();
            alert("❌ Erro no servidor: " + erro.error);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("❌ Erro ao conectar com o servidor. Verifique sua internet.");
    }
}

