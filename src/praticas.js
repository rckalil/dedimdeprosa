// Dicionário de Equipamentos (Manter como estava)
const equipamentoData = {
    "Atenção": {
        "Luneta": [3 ,"Permite rolar Atenção para observação a longas distâncias."],
        "Apito": [3 ,"Permite se comunicar à distância."],
        "Tapa-olho": [4, "Permite rolar Atenção para enxergar no escuro."],
        "Bússola": [4, "Concede Atenção +2 para se localizar."],
        "Capa da Névoa": [4, "+1 potencia, aumenta a eficácia do salto da mandinga 'Ortopressão'"],
        // "Avião de papel": [4, "Permite se comunicar à distância."],
        "Capa": [5, "Concede Atenção +2 para se esconder."],
        "Chicote": [5, "Permite usar Atenção para atacar."],
        // "Bumerangue": [6, "Permite usar Atenção para atacar à distância."]
        "Braceletes de Tupã": [5, "Quando acertar um ataque, você pode sofrer -1 em Potência para dar um choque e paralisar o oponente, se o fôlego dele for menor que o seu."],
    },
    "Concentração": {
        "Atadura": [3 ,"Permite rolar Concentração +1 para suturar feridas."],
        "Cachimbo": [3, "Permite rolar Concentração +1 para lembrar uma conversa."],
        "Baú": [3, "Uma vez por dia, rola sua concentração (obtendo X) e aumenta em X uma rolagem. O bônus pode ser usado para você ou para um aliado próximo."],
        "Lupa": [3, "Concede Concentração +1 para investigar"],
        "Livro de Receitas": [4, "Uma vez por dia, rola sua concentração (obtendo X) e prepara X quitutes que recuperam 1 de fôlego. O fôlego pode ser dado a você ou a um aliado próximo."],
        "Novelo": [4, "Permite rolar Concentração+1 para costurar."],
        "Pederneira": [4, "Permite rolar Concentração +1 para fazer fogo."],
        "Dicionário": [4, "Permite rolar Concentração +1 para compreender outra língua."],
        "Anel da Ranni": [4, "Ao atacar posso usar a alma de ranni pra aumentar minha potencia em +1 ou tirar -2 para recuperar +1 de folego.(1 vez por Cena)"],
        "Enciclopédia": [5, "Permite rolar Concentração +2 para obter uma informação."],
        "Talismã": [5, "Você pode rolar sua concentração para recuperar fôlego seu ou de um aliado próximo. Se o fizer, sofre -1 em Concentração."],
        "Luvas explosiva": [5, "Uma vez por dia, rola sua concentração (obtendo X) e recebe X cargas explosivas. Com cada uma você pode invocar uma bola de fogo que causa Concentração + 1 de dano."],
        "Bolsa d'água": [5, "Uma vez por dia, quando ficar com 0 de Fôlego, pode estourar a bolsa para recuperar o Fôlego que perdeu por último."],
    },
    "Potência": {
        "Punhal": [3 ,"Concede +1 em Potência em combate. É uma ferramenta de corte."],
        "Cajado": [3 ,"Concede +1 em Potência em combate. É uma ferramenta de caminhada."],
        "Espada Curta": [4, "Concede +2 em Potência em combate."],
        "Laço": [4, "Permite usar Potência para agarrar alvos à distância."],
        "Lança": [4, "Concede +1 em potência. Pode atacar a distância com potência - sem o bônus."],
        "Rapieira": [4, "Você pode desferir dois ataques de uma vez - rola potência duas vezes."],
        "Foice": [5, "Você pode acertar vários inimigos com o mesmo ataque - rola potência uma vez e usa contra mais de um inimigo."],
        "Arco e Flecha": [5, "Concede Potência +1 em ataques à distância."],
        "Escudo": [5, "Quando receber um ataque, você pode sofrer -1 de potência para evitar perda de fôlego."],
        "Facão": [5, "Concede +2 em Potência em combate. É uma ferramenta de corte."],
        "Machado": [5, "Quando atacar, você pode sofre -1 de potência para maximizar seu dado."],
        "Espada Real de Duas Mãos": [5, "Concede +3 em Potência em combate."],
    },
    "Tato": {
        "Boné": [3, "Concede Tato +1 para enganar."],
        "Gaita": [3, "Permite rolar Tato para atrair a atenção de multidões ou animais."],
        "Luvas": [3, "Concede Tato +1 para passar a mão."],
        "Maquiagem": [4, "Concede Tato +1 para seduzir."],
        "Pião": [4, "Permite usar Tato para atacar."],
        "Sela": [4, "Concede Tato +1 para cavalgar."],
        "Flauta Encantada": [4, "Você pode sofrer -1 em tato para invocar um animal para ajudar. Role Tato, e o Fôlego do animal é o resultado."],
        "Bolinhas de Gude": [5, "Uma vez por dia, rola seu tato (obtendo X) e aumenta em X a dificuldade de uma rolagem. O ônus pode ser usado em inimigos não muito longe."],
        "Colar enfeitiçado": [5, "Você pode rolar tato para controlar alguém, e consegue se obtiver um valor maior que o fôlego dele. A cada vez que conseguir controlar alguém, toma -1 em seu tato."]
    }
};

const FolegoPorPratica = 2; 

// Mapeamento de IDs para Atributos
const atributoMap = {
    "Atenção": 'atencao',
    "Concentração": 'concentracao',
    "Potência": 'potencia',
    "Tato": 'tato'
};

const dadoValorMap = {
    "1d4": 4,   // Valores numéricos correspondentes ao HTML
    "1d6": 6,
    "1d8": 8,
    "1d10": 10,
    "1d12": 12
};

/**
 * Converte a string do dado ('4' ou '12') para o valor numérico (4 ou 12).
 */
function getValorDadoNumerico(atributoId) {
    // console.log(atributoId)
    // console.log(`ficha.atributo.${atributoId}`)
    const dadoString = localStorage.getItem(`ficha.atributo.${atributoId}`) || "4"; // Default para 4
    // console.log(dadoString)
    if (!dadoString || dadoString.trim() === '') {
        return 0;
    }
    const chave = dadoString.trim();
    return dadoValorMap[chave] || 0;
}

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
    // console.log(localStorage.getItem('ficha.praticas'))
    const praticasSalvasJSON = localStorage.getItem('ficha.praticas') || '[]';
    const praticasSalvas = JSON.parse(praticasSalvasJSON); 

    // criarListaPraticas(praticasSalvas);
    criarMostruarioDePraticas(praticasSalvas); // Chama a nova função
    
    // 4. Rodar o check inicial
    checkPraticasLimit();
});


// ------------------------------------------------------------------
// --- LÓGICA DE VALIDAÇÃO E FEEDBACK ---
// ------------------------------------------------------------------

function getPraticasSelecionadas() {
    const checkboxes = document.querySelectorAll('#equipamentoMostruario input[type="checkbox"]');
    const praticasArray = [];
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const attr = cb.getAttribute('data-atributo')
            const items = equipamentoData[attr];
            const itemNome = cb.getAttribute('data-nome')
            const [nivelRequerido, descricao] = items[itemNome];
            praticasArray.push(itemNome+" ("+attr+" nível "+nivelRequerido+"): "+descricao);
        }
    });
    // console.log(praticasArray)
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

function validateAndSavePraticas(direction) {
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
    if (direction==='front'){
        nextStep();
    }
    else if (direction==='back') {
        prevStep();
    }
}

// ------------------------------------------------------------------
// --- LÓGICA DE GERAÇÃO DO MOSTRUÁRIO ---
// ------------------------------------------------------------------

function criarMostruarioDePraticas(praticasSalvas) {
    const mostruario = document.getElementById('equipamentoMostruario');
    mostruario.innerHTML = ''; // Limpa o conteúdo anterior
    
    // Obter os valores dos dados de cada atributo
    const atributosDados = {};
    for (const nome in atributoMap) {
        const id = atributoMap[nome];
        atributosDados[nome] = getValorDadoNumerico(id);
    }

    for (const atributoNome in equipamentoData) {
        const items = equipamentoData[atributoNome];
        const limiteDado = atributosDados[atributoNome]; // Ex: 8 para Potência d8
        
        // 1. Criar a coluna do Atributo
        const coluna = document.createElement('div');
        coluna.classList.add('atributo-coluna');
        
        coluna.innerHTML = `
            <h3>${atributoNome} (D${limiteDado})</h3>
            <ul class="lista-opcoes"></ul>
        `;
        
        const listaUL = coluna.querySelector('ul');

        // 2. Popular a lista com itens
        for (const itemNome in items) {
            const [nivelRequerido, descricao] = items[itemNome];
            
            // Checa se o item está selecionado
            // console.log("nwdown")
            // console.log(praticasSalvas)
            // console.log(itemNome)
            let isSelecionado = praticasSalvas.includes(itemNome+" ("+atributoNome+" nível "+nivelRequerido+"): "+descricao);
            
            // Checa a disponibilidade: dado atual deve ser >= nível requerido
            const isDisponivel = (limiteDado+2)/2 >= nivelRequerido;
            
            const li = document.createElement('li');
            li.classList.add('item-pratica');
            if (!isDisponivel) {
                li.classList.add('indisponivel');
                isSelecionado = false;
            }
            
            li.innerHTML = `
                <label title="${itemNome}: ${descricao}">
                    <input type="checkbox" 
                        data-nome="${itemNome}"
                        data-nivel="${nivelRequerido}"
                        data-atributo="${atributoNome}"
                        onchange="checkPraticasLimit()"
                        ${isSelecionado ? "checked" : ""}
                        ${!isDisponivel ? "disabled" : ""}
                    />
                    <strong>${itemNome}</strong> (Nível ${nivelRequerido})
                    <small>${descricao}</small>
                </label>
            `;
            listaUL.appendChild(li);
        }
        
        mostruario.appendChild(coluna);
    }
}