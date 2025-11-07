

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
    "O Fôlego basicamente indica o nível do seu personagem. Todo o resto depende de quanto fôlego você tem.\n\n" +
    "O personagem mais simples possui 4 de fôlego. Geralmente, um aventureiro começa com um pouco mais, indicando seu ânimo diferenciado, que o motiva frente aos desafios."
];

const destaquePorSlide = [
    null,                  // Slide 0: Nada destacado (ou o nome, se for a primeira coisa)
    "ficha-nome",          // Slide 1: Foca no Nome
    "ficha-folego",     // Slide 2: Foca no bloco de Atributos
    "attr-potencia",       // Slide 3: Foca apenas no atributo Potência
    "ficha-citacoes",      // Slide 4: Foca nas citações
    "ficha-habilidades"    // Slide 5: Foca nas habilidades/ataques
    // ... adicione mais IDs conforme seus slides
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