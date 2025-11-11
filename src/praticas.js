// Dicionário de Equipamentos (Manter como estava)
const equipamentoData = {
    "Espada Curta": "Concede +2 em Potência em combate.",
    "Laço": "Permite usar Potência para agarrar alvos à distância.",
    "Kit Médico": "Permite rolar Concentração para suturar feridas e estabilizar.",
    "Luneta": "Permite rolar Atenção para observação a longas distâncias.",
    "Flauta": "Permite rolar Tato para acalmar multidões ou animais.",
    "Arco e Flecha": "Concede Potência +1 em ataques à distância.",
    "Poção Cura": "Item consumível."
};

const FolegoPorPratica = 2; 

function calcularMaxPraticas(folego) {
    return Math.floor(folego / FolegoPorPratica);
}

// ------------------------------------------------------------------
// --- LÓGICA DE GERAÇÃO DA LISTA E CARREGAMENTO ---
// ------------------------------------------------------------------

function criarListaPraticas(praticasSalvas) {
    const listaContainer = document.getElementById('lista-praticas');
    listaContainer.innerHTML = ''; 

    let index = 0; // Usado para identificar cada checkbox
    for (const nome in equipamentoData) {
        const descricao = equipamentoData[nome];
        
        // Verifica se o item está na lista de itens salvos
        const isSelecionado = praticasSalvas.includes(nome);

        const li = document.createElement('li');
        li.innerHTML = `
            <label>
                <input type="checkbox" 
                    data-nome="${nome}"
                    onchange="checkPraticasLimit()"
                    ${isSelecionado ? "checked" : ""} 
                />
                <strong>${nome}</strong><br/>
                <small>${descricao}</small>
            </label>
        `;
        listaContainer.appendChild(li);
        index++;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // 1. Carregar Fôlego e Limite
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 4;
    const maxPraticas = calcularMaxPraticas(folego);

    // 2. Exibir o Fôlego e o Limite
    document.getElementById('folegoDisplay').textContent = folego;
    document.getElementById('maxEquipDisplay').textContent = maxPraticas;
    
    // 3. Carregar itens salvos e construir a lista
    const praticasSalvasJSON = localStorage.getItem('ficha.praticas') || '[]';
    const praticasSalvas = JSON.parse(praticasSalvasJSON); 

    criarListaPraticas(praticasSalvas);
    
    // 4. Rodar o check inicial
    checkPraticasLimit();
});


// ------------------------------------------------------------------
// --- LÓGICA DE VALIDAÇÃO E FEEDBACK ---
// ------------------------------------------------------------------

function getPraticasSelecionadas() {
    const checkboxes = document.querySelectorAll('#lista-praticas input[type="checkbox"]');
    const praticasArray = [];
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            praticasArray.push(cb.getAttribute('data-nome'));
        }
    });
    return praticasArray;
}

function checkPraticasLimit() {
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 4;
    const maxPraticas = calcularMaxPraticas(folego);
    const praticasAtuais = getPraticasSelecionadas().length;
    
    const feedbackElement = document.getElementById('feedback-praticas');
    
    let dentroDoLimite = true;
    
    if (praticasAtuais > maxPraticas) {
        const excesso = praticasAtuais - maxPraticas;
        feedbackElement.textContent = `❌ Você excedeu o limite! Desmarque ${excesso} Prática(s).`;
        feedbackElement.style.color = 'red';
        dentroDoLimite = false;
    } else if (praticasAtuais === maxPraticas) {
        feedbackElement.textContent = `✅ Limite de ${maxPraticas} Prática(s) alcançado!`;
        feedbackElement.style.color = 'green';
    } else {
        const restantes = maxPraticas - praticasAtuais;
        feedbackElement.textContent = `Você selecionou ${praticasAtuais} Prática(s). Faltam ${restantes}.`;
        feedbackElement.style.color = '#dfb921';
    }
    
    return dentroDoLimite;
}

function validateAndSavePraticas() {
    // 1. Verificar limite
    const dentroDoLimite = checkPraticasLimit();

    if (!dentroDoLimite) {
        alert("Atenção: Você excedeu o número máximo de Práticas. Por favor, desmarque o excesso antes de prosseguir.");
        return;
    }
    
    // 2. Salvar a lista de itens selecionados
    const praticasSelecionadas = getPraticasSelecionadas();
    localStorage.setItem('ficha.praticas', JSON.stringify(praticasSelecionadas));

    // 3. Se tudo estiver OK, avança para a próxima página
    nextStep();
}