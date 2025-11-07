

// --- Estrutura do Tutorial (Defina seus textos com \n para separar os parágrafos) ---
const textosTutorial = [
    // Slide 0
    "Dedim de Prosa é um jogo de faz de conta, onde um Narrador apresenta desafios e cada jogador decide o que seu personagem fará.\n\n" + 
    "Para você se familiarizar com o jogo, vamos conhecer o peprsonagem Manoel e acompanhar a aventura do herói.",
    
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
    "Potência e tato também são opostos. Os dois têm energia. Potência é sobre impor energia sobre seus arredores. Tato tem haver com perceber estímulos do mundo.",

    "Você pode aplicar esforço sobre um atributo.\n\n" +
    "Se você quiser muito escalar um muro, e o Narrador do jogo diz que você precisa de um 5, mas você só tira 4, você pode se esforçar.\n\n" +
    "O esforço permite que você receba +1 na hora, mas você vai ter -1 no atributo oposto por um tempo. Geralmente é até vocês passarem de uma situação à outra.",

    "Um personagem possui uma mandinga diferente para cada 3 pontos de fôlego. Assim, Manoel só possui uma. As mandingas podem ser usadas por um personagem para ganhar vantagens no jogo.\n\n" +
    "Por exemplo, um personagem pode ter uma mandinga que diz \"Que Deus o abençoe\", permitindo a ele rolar concentração para restaurar o fôlego de alguém. Ou \"Eu sou o mais forte\", permitindo realizar um ataque com um dado maior de potência.\n\n" +
    "Manoel possui \"Eu já servi à Coroa\". Então, durante o jogo, ele pode gastar 1 de fôlego para usar a sua mandinga. Ele pode, por exemplo, conhecer os mapas de uma região, do tempo em que esteve no exército, então não se perde com facilidade.\n\n" +
    "Ou ele gasta um fôlego para ser bem recebido pelos aldeões de uma vila. Você sempre pode pensar em novos efeitos, conversando com o Narrador para fazer sentido na estória.\n\n" +
    "Contudo, as mandingas têm um efeito duplo. Assim como elas expandem as capacidades do personagem, elas o limitam. Quando for apropriado, o Narrador pode dar um ponto de fôlego ao jogador para ativar a mandinga de forma negativa.\n\n" +
    "Um personagem com \"Que Deus o abençoe\" pode ser compelido a ajudar os outros, mesmo quando não é conveniente ao grupo. Um com \"Eu sou o mais forte\" pode ser extremamente impulsivo e atralhar negociações. No caso de Manoel, ele ter sido do exército pode dificultar que ele chegue despercebido nos lugares, pois muitos já o conhecem; ou algumas pessoas podem não ficar confortáveis dando informações a ele.",

    "A história do personagem é muito importante pra dar um gostinho ao jogo. Quando você está criando seu personagem, pensar em quem ele é e o que faz também te ajuda a escolher seus atributos, mandingas e práticas (calma, já chegaremos nas práticas).\n\n" +
    "Você pode escrever um texto tão breve ou complexo como queira, só divirta-se. E faça um personagem que nos divirta, que dê emoção de jogar.",

    "As práticas são muito importantes para o seu personagem. Elas geralmente estão ligadas a um equipamento e, além de poderem dar algum bônus, elas permitem fazer mais coisas.\n\n" +
    "Uma espada permite ataques mais fortes; com um kit médico, você pode suturar feridas; uma luneta permite ver a distâncias maiores; você pode tocar com uma flauta.\n\n" +
    "A prática é uma atividade à qual o personagem se dedica, e ela é representada pelo equipamento que ele usa. Um personagem consegue se dedicar bem a uma prática a cada 2 pontos de fôlego que possui.\n\n" +
    "Portanto, Manoel possui prática em 2 equipamentos. A espada lhe concede +2 de potência quando ele está lutando. Além disso, com a espada você pode dizer que decapitou seu inimigo ou cortou a ponte elvadiça - muito mais maneiro.\n\n" +
    "E, ele também possui um laço. Com esse laço, Manoel não ganha bônus, mas ele pode usar sua potência para laçar os outros, prendê-los de longe.",

    "Bem, agora, você já pode criar seu próprio personagem. Mas não se preocupe, se ainda tiver dúvidas, vamos ver Manoel em ação, num exemplo ligeiro."

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
    "ficha-atributos",
    "ficha-mandingas",
    "ficha-historia",
    "ficha-praticas",
    null
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
    

    gerenciarDestaque(indiceTutorial);
}

// --- Funções de Navegação de Conteúdo (Você usará estas no onclick) ---

function avancarTutorial() {
    if (indiceTutorial < textosTutorial.length - 1) {
        indiceTutorial++;
        atualizarTextoTutorial();
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