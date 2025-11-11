// Simulação do Dicionário de Equipamentos (Você preencherá isso com seus dados)
const equipamentoData = {
    "Espada Curta": "Concede +2 em Potência em combate.",
    "Laço": "Permite usar Potência para agarrar alvos à distância.",
    "Kit Médico": "Permite rolar Concentração para suturar feridas e estabilizar.",
    "Luneta": "Permite rolar Atenção para observação a longas distâncias.",
    "Flauta": "Permite rolar Tato para acalmar multidões ou animais.",
    "Arco e Flecha": "Concede Potência +1 em ataques à distância.",
    "Poção Cura": "Item consumível."
    // Adicione mais itens aqui
};

const FolegoPorPratica = 2; // Regra: 1 Prática a cada 2 pontos de Fôlego

function calcularMaxPraticas(folego) {
    return Math.floor(folego / FolegoPorPratica);
}

// ------------------------------------------------------------------
// --- LÓGICA DE CARREGAMENTO E INICIALIZAÇÃO ---
// ------------------------------------------------------------------

function preencherDatalist() {
    const datalist = document.getElementById('equipamentos-disponiveis');
    datalist.innerHTML = '';
    for (const equipamento in equipamentoData) {
        datalist.innerHTML += `<option value="${equipamento}">`;
    }
}

function carregarPraticas() {
    // 1. Carregar Fôlego e Limite
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 4;
    const maxPraticas = calcularMaxPraticas(folego);

    // 2. Exibir o Fôlego e o Limite
    document.getElementById('folegoDisplay').textContent = folego;
    document.getElementById('maxEquipDisplay').textContent = maxPraticas;
    
    // 3. Carregar e preencher a lista de Mandingas salvas (se existirem)
    const praticasSalvasJSON = localStorage.getItem('ficha.praticas') || '[]';
    // Assume que a lista é salva como JSON de array
    const praticasSalvas = JSON.parse(praticasSalvasJSON); 

    // 4. Re-adicionar itens salvos ao DOM
    const lista = document.getElementById('lista-praticas');
    lista.innerHTML = ''; // Limpa a lista antes de reconstruir
    praticasSalvas.forEach(pratica => {
        adicionarPraticaAoDOM(pratica, lista);
    });

    // 5. Atualizar o feedback
    checkPraticasLimit();
}

window.addEventListener('DOMContentLoaded', () => {
    preencherDatalist();
    carregarPraticas();
    
    // Adiciona listener para submissão do formulário
    const formPraticas = document.getElementById('form-praticas');
    formPraticas.addEventListener('submit', adicionarPratica);
    
    // Bloqueio do ENTER (se mantiver type="submit")
    const inputPratica = document.getElementById('input-pratica');
    inputPratica.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            adicionarPratica(event); 
        }
    });
    // Adiciona o listener de INPUT para o feedback em tempo real
    if (inputPratica) {
        inputPratica.addEventListener('input', exibirDetalheEquipamento);
    }
});

// ------------------------------------------------------------------
// --- LÓGICA DE ADIÇÃO E EXCLUSÃO (DOM) ---
// ------------------------------------------------------------------

function adicionarPratica(event) {
    event.preventDefault(); 

    const input = document.getElementById('input-pratica');
    const lista = document.getElementById('lista-praticas');
    const praticaTexto = input.value.trim();

    if (praticaTexto === "") {
        alert("A Prática não pode estar vazia!");
        return;
    }
    
    // Verifica se já atingiu o limite antes de adicionar
    if (!checkPraticasLimit(true)) {
        alert("Limite de Práticas/Equipamentos atingido.");
        return;
    }

    // Adiciona item ao DOM
    adicionarPraticaAoDOM(praticaTexto, lista);
    
    // Limpa e faz a verificação
    input.value = '';
    checkPraticasLimit(); 
}

// A função precisa ser chamada com o texto da prática e o elemento pai (lista)
function adicionarPraticaAoDOM(praticaTexto, lista) {
    const novoItem = document.createElement('div');
    novoItem.classList.add('mandinga-item'); // Reutilizando a classe de estilo

    const textoElement = document.createElement('span');
    textoElement.textContent = praticaTexto;

    // --- LÓGICA DE TOOLTIP AQUI ---
    
    // 1. Obtém a descrição do dicionário (se existir)
    const descricao = equipamentoData[praticaTexto] || "Sem descrição detalhada.";
    
    // 2. Adiciona a descrição como o atributo 'title'
    // O navegador exibirá esta string como um balão flutuante ao passar o mouse.
    novoItem.title = `${praticaTexto}: ${descricao}`; 
    
    // --- Fim da Lógica de Tooltip ---

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'x';
    btnRemover.classList.add('btn-remover');
    
    btnRemover.onclick = () => {
        lista.removeChild(novoItem); 
        checkPraticasLimit(); // RECHECK APÓS EXCLUSÃO
        salvarPraticasArray(); 
    };
    
    novoItem.appendChild(textoElement);
    novoItem.appendChild(btnRemover);
    lista.prepend(novoItem); 
}

// ------------------------------------------------------------------
// --- LÓGICA DE PERSISTÊNCIA E VALIDAÇÃO ---
// ------------------------------------------------------------------

function getPraticasArray() {
    const lista = document.getElementById('lista-praticas');
    // Mapeia os elementos do DOM de volta para um Array de Strings
    return Array.from(lista.getElementsByClassName('mandinga-item')).map(item => {
        // Assume que o texto é o primeiro filho (o <span>)
        return item.querySelector('span').textContent; 
    });
}

function salvarPraticasArray() {
    const praticasArray = getPraticasArray();
    // Salva a lista como uma string JSON
    localStorage.setItem('ficha.praticas', JSON.stringify(praticasArray));
}

function checkPraticasLimit(checkBeforeAdd = false) {
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 4;
    const maxPraticas = calcularMaxPraticas(folego);
    const lista = document.getElementById('lista-praticas');
    const praticasAtuais = lista.getElementsByClassName('mandinga-item').length;
    
    const feedbackElement = document.getElementById('feedback-praticas');
    
    if (checkBeforeAdd && praticasAtuais >= maxPraticas) {
        return false; // Usado pela função adicionarPratica para bloquear
    }

    if (praticasAtuais > maxPraticas) {
        feedbackElement.textContent = `⚠️ Você possui Práticas demais! O limite é ${maxPraticas} para o Fôlego atual.`;
        feedbackElement.style.color = 'red';
    } else if (praticasAtuais === maxPraticas) {
        feedbackElement.textContent = `✅ Práticas completas (${maxPraticas} de ${maxPraticas}).`;
        feedbackElement.style.color = 'green';
    } else {
        const faltam = maxPraticas - praticasAtuais;
        feedbackElement.textContent = `Você precisa adicionar mais ${faltam} Prática(s). Limite: ${maxPraticas}.`;
        feedbackElement.style.color = '#dfb921';
    }
    
    // Atualiza o estado dos botões (sempre após o check)
    const btnAdicionar = document.getElementById('btn-adicionar-pratica');
    const inputAdicionar = document.getElementById('input-pratica');
    const limiteAtingido = (praticasAtuais >= maxPraticas);
    
    btnAdicionar.disabled = limiteAtingido;
    inputAdicionar.disabled = limiteAtingido;
    inputAdicionar.placeholder = limiteAtingido ? "Limite de Práticas atingido." : "Adicionar Prática ou Equipamento";

    return praticasAtuais <= maxPraticas;
}

function validateAndSavePraticas() {
    // 1. Verifica se a contagem final está correta
    const dentroDoLimite = checkPraticasLimit();
    
    if (!dentroDoLimite) {
        alert("Atenção: Você excedeu o número máximo de Práticas. Por favor, ajuste antes de prosseguir.");
        return;
    }
    
    // 2. O salvamento já foi feito em tempo real em adicionarPraticaAoDOM/btnRemover, 
    // mas chamamos novamente para garantir o estado final.
    salvarPraticasArray();
    
    // 3. Se tudo estiver OK, avança para a próxima página
    nextStep();
}

function exibirDetalheEquipamento() {
    const input = document.getElementById('input-pratica');
    const descBox = document.getElementById('descricao-equipamento');
    
    // Pega o valor atual do input (o nome do equipamento)
    const nomeEquipamento = input.value.trim(); 
    
    // Busca a descrição no seu dicionário
    const descricao = equipamentoData[nomeEquipamento];

    if (descricao) {
        // Se a descrição for encontrada, exibe o balão com o texto
        descBox.textContent = `Detalhe: ${descricao}`;
        descBox.style.display = 'block';
    } else {
        // Se o input estiver vazio ou o item não for encontrado
        descBox.textContent = '';
        descBox.style.display = 'none';
    }
}