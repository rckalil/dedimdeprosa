

// --- Estrutura do Tutorial (Defina seus textos com \n para separar os parágrafos) ---
const textosTutorial = [
    // Slide 0
    "Dedim de Prosa é um jogo de faz de conta, onde um Narrador apresenta desafios e cada jogador decide o que seu personagem fará.\n\n" + 
    "Para você se familiarizar com o jogo, vamos acompanhar a aventura do herói Manoel.",
    
    // Slide 1
    "Nas bordas da tela, você pode ver a ficha de personagem de Manoel, com todas as suas informações.\n\n" +
    "Vamos passar por cada uma e exemplificar seus usos.\n\n" +
    "Aqui, destacado em verde, temos o nome do personagem, muito simples",

    "Logo depois do nome, temos o Fôlego do personagem.\n\n" +
    "O nível do personagem é baseado em seu fôlego. A partir do fôlego, são definidos os Atributos, Mandingas e Práticas.\n\n" +
    "O fôlego representa a energia do personagem - o quanto ele pode suportar pressão durante a ação. Quando toma dano ou realiza uma atividade muito desgastante, o personagem perde fôlego.\n\n" +
    "Após descanso esse fôlego é recuperado. Se o fôlego do personagem chegar a 0, ele desmaia exausto.\n\n" +
    "O personagem mais simples possui 4 de fôlego. Geralmente, um aventureiro começa com um pouco mais, indicando seu ânimo diferenciado, que o motiva frente aos desafios.",

    "Há 4 atributos. Cada atributo é representado por um dado. Quando fizer algo com um atributo, você joga o dado dele. Então, quanto maior for o dado, mais chances você tem de ter sucesso.\n\n" +
    "Você escolhe os dados do seu personagem, mas a soma deles deve ser igual ao seu fôlego (falei que era importante) vezes 4. Como Manoel possui fôlego 5, ele pode ter atributos que valem juntos 20. Como veremos mais à frente que Manoel era do exército, seus atributos de atenção e potência são melhores.\n\n" +
    "Mas o que é atenção, tato e esses trem aí, afinal?",

    "Atenção é referente à sua capacidade de prestar atenção no seu entorno, coordenar diversas tarefas.\n\n" +
    "Você pode usar atenção para procurar um objeto perdido, observar alguém passando lá longe, organizar uma festa.",

    "Concentração é sobre sua capacidade de focar em uma tarefa ou pessoa específica, atentar aos detalhes.\n\n" +
    "Ler uma receita e cozinhar um doce, montar um quebra-cabeças, limpar o ferimento de um amigo.\n\n" +
    "Atenção e concentração são como opostos. Ambos estão relacionados ao seu foco, mas enquanto atenção é sobre o exterior, concentração é mais sobre tarefas pontuais.",

    "Potência implica sua capacidade de se impor, de moldar o exterior. Está relacionado à força física.\n\n" +
    "Você vai usar potência quando quiser bater em alguém, empurrar um móvel, apostar uma corrida.",

    "Tato é referente a delicadeza, cuidado. A capacidade de perceber nuances, estabelecer conexões.\n\n" +
    "Enganar alguém, acalmar um cachorro com medo, dançar.\n\n" +
    "Potência e tato também são opostos. Os dois têm energia. Potência é sobre impor energia, sobre seus arredores. Tato tem haver com primeiro receber estímulos do mundo.",

    "Se você quiser muito escalar um muro, e o Narrador do jogo diz que você precisa de um 5, mas você só tira 4, você pode se esforçar.\n\n" +
    "O esforço permite que você receba +1 na hora, mas você vai ter -1 no atributo oposto por um tempo. Geralmente é até vocês passarem de uma situação à outra."
];

const destaquePorSlide = [
    null,                  // Slide 0: Nada destacado (ou o nome, se for a primeira coisa)
    "ficha-nome",          // Slide 1: Foca no Nome
    "ficha-folego",     // Slide 2: Foca no bloco de Atributos
    "ficha-atributos",       // Slide 3: Foca apenas no atributo Potência
    "attr-atencao",      // Slide 4: Foca nas citações
    "attr-concentracao",    // Slide 5: Foca nas habilidades/ataques
    "attr-potencia",
    "attr-tato",
    "ficha-atributos"
];

let indiceTutorial = 0; 
const elementoJogo = document.querySelector('.jogo'); // Seleciona o contêiner principal

function atualizarTextoTutorial() {
    // Verifica se o elemento contêiner existe
    if (!elementoJogo) {
        console.error("Elemento com a classe '.jogo' não encontrado!");
        return;
    }

    // 1. Limpa o conteúdo anterior
    elementoJogo.innerHTML = '';

    // Obtém o texto atual e o divide em parágrafos usando \n\n como separador
    const textoCompleto = textosTutorial[indiceTutorial];
    const paragrafos = textoCompleto.split('\n\n'); 

    // 2. Itera sobre cada parágrafo e o adiciona à caixa .jogo
    paragrafos.forEach(paragrafoTexto => {
        // Ignora parágrafos vazios resultantes de múltiplos \n
        if (paragrafoTexto.trim() !== '') {
            const p = document.createElement('p');
            // Nota: .textContent é mais seguro contra XSS do que .innerHTML
            p.textContent = paragrafoTexto.trim();
            elementoJogo.appendChild(p);
        }
    });

    // 3. Gerenciamento do estado dos botões (Voltar/Avançar)
    const btnPrev = document.querySelector('.menu button:first-child');
    const btnNext = document.querySelector('.menu button:last-child');
    
    if (btnPrev && btnNext) {
        // Desativa 'Voltar' no primeiro slide
        btnPrev.disabled = (indiceTutorial === 0);
        // Desativa 'Avançar' no último slide
        btnNext.disabled = (indiceTutorial === textosTutorial.length - 1);
        
        // Exemplo: se for o último slide, mude o texto do botão 'Avançar'
        if (indiceTutorial === textosTutorial.length - 1) {
            btnNext.textContent = "Começar Criação"; 
        } else {
            btnNext.textContent = "Avançar";
        }
    }

    gerenciarDestaque(indiceTutorial);
}

// --- Funções de Navegação de Conteúdo (Você usará estas no onclick) ---

function avancarTutorial() {
    if (indiceTutorial < textosTutorial.length - 1) {
        indiceTutorial++;
        atualizarTextoTutorial();
    } else if (indiceTutorial === textosTutorial.length - 1) {
        // Comportamento especial ao final: Inicia a criação de personagem
        // Chame aqui a função de navegação de página, se for o caso.
        // iniciarCriacao(); 
    }
}

function voltarTutorial() {
    if (indiceTutorial > 0) {
        indiceTutorial--;
        atualizarTextoTutorial();
    }
}

// Funções de inicialização e navegação de página (MANTIDAS DO CONTEXTO ANTERIOR)
// Para que o código funcione, você precisará definir 'pages' e 'getBasePath' 
// se for usar 'nextStep' e 'prevStep' para navegação entre arquivos HTML.

// ... (Aqui viria o restante do seu código, como getBasePath, nextStep, prevStep)

// Assegura que o primeiro texto apareça ao carregar a página
window.onload = atualizarTextoTutorial;

// Lista de IDs dos elementos que serão destacados em cada passo do tutorial
// O índice do array corresponde ao índice do slide (indiceTutorial)


function gerenciarDestaque(indice) {
    // 1. Remove o destaque de TODOS os elementos da ficha
    document.querySelectorAll('.container-c-sheet *').forEach(el => {
        el.classList.remove('highlight');
    });

    // 2. Obtém a ID do elemento que deve ser destacado neste índice
    const idParaDestacar = destaquePorSlide[indice];
    console.log(idParaDestacar);

    // 3. Adiciona a classe 'highlight' ao elemento alvo
    if (idParaDestacar) {
        const elementoAlvo = document.getElementById(idParaDestacar);
        if (elementoAlvo) {
            elementoAlvo.classList.add('highlight');
        }
    }
}