const meritos = {
  fisicos: [
    { nome: "SENTIDO AGUÇADO", descricao: "Um de seus sentidos é excepcionalmente aguçado (visão, audição, paladar, tato ou olfato)", custo: 1 },
    { nome: "AMBIDESTRO", descricao: "Você possui um elevado nível de destreza manual, podendo executar tarefas com sua mão 'inábil' sem sofrer penalidades.", custo: 1 },
    { nome: "INGERIR COMIDA", descricao: "Você tem a capacidade de ingerir comida e até saboreá-la.", custo: 1 },
    { nome: "EQUILÍBRIO PERFEITO", descricao: "Você possui um senso de equilíbrio inato perfeito.", custo: 1 },
    { nome: "RUBOR DE SAÚDE", descricao: "A sua aparência é mais natural e saudável do que a dos outros vampiros, o que lhe permite misturar-se aos humanos com mais facilidade.", custo: 2 },
    { nome: "Voz  ENCANTADORA", descricao: "Existe algo em sua voz que os outros simplesmente não conseguem ignorar.", custo: 2 },
    { nome: "TEMERÁRIO", descricao: "Você é bom em assumir riscos e ainda melhor em sobreviver a eles.", custo: 3 },
    { nome: "DIGESTÃO EFICIENTE", descricao: "Você é capaz de extrair mais nutrientes do sangue do que o habitual.", custo: 3 },
    { nome: "CORPO GRANDE", descricao: "Você é anormalmente grande, medindo talvez mais de dois metros de altura.", custo: 4 }
  ],
  mentais: [
    { nome: "BOM SENSO", descricao: "Você tem uma quantidade significativa de sabedoria quotidiana prática.", custo: 1 },
    { nome: "CONCENTRAÇÃO", descricao: "Você tem a habilidadede de focalizar a sua mente e desligar-se de qualquer distração ou perturbação.", custo: 1 },
    { nome: "NOÇÃO EXATA DO TEMPO", descricao: "Você tem uma noção de tempo inata e é capaz de estimar a passagem do tempo com exatidão, sem usar relógios ou outros instrumentos mecânicos.", custo: 1 },
    { nome: "CÓDIGO DE HONRA", descricao: "Você tem um código de ética pessoal do qual é adepto.", custo: 2 },
    { nome: "MEMÓRIA EIDETICA", descricao: "Você se lembra, com todos os detalhes, de coisas que tiver visto ou ouvido.", custo: 2 },
    { nome: "SONO LEVE", descricao: "Você consegue acordar instantaneamente ao menor sinal de problema ou perigo e o faz sem nenhuma preguiça nem hesitação.", custo: 2 },
    { nome: "LINGUISTA NATO", descricao: "Você tem facilidade para línguas e pode adicionar três dados a todas as paradas de dados que envolvem línguas faladas ou escritas.", custo: 2 },
    { nome: "TEMPERAMENTO   CALMO", descricao: "Você é naturalmente calmo e dificilmente perde o controle.", custo: 3 },
    { nome: "VONTADE DE  FERRO", descricao: "Quando você está determinado e a sua mente concentrada, nada pode afastá-lo de seus objetivos.", custo: 3 }
  ],
  sociais: [
    { nome: "SENHOR DE PRESTÍGIO", descricao: "O seu senhor teve ou tem grande Status em sua seita ou clã e isso confere um certo prestígio a você.", custo: 1 },
    { nome: "LÍDER NATO", descricao: "Você é dotado de um certo magnetismo que afeta os demais naturalmente.", custo: 1 },
    { nome: "Recurso", descricao: "Você tem acesso a fontes de renda estáveis.", custo: 3 },
    { nome: "DÍVIDA  DE GRATIDÃO SIMPLES", descricao: "Um ancião te deve um favor.", custo: 1 },
    { nome: "DÍVIDA  DE GRATIDÃO PROFUNDA", descricao: "Um ancião te deve a vida.", custo: 3 }
  ],
  sobrenaturais: [
    { nome: "MÉDIUM", descricao: "Você possui a afinidade natural para sentir e ouvir espíritos, fantasmas e vultos.", custo: 2 },
    { nome: "RESISTENCIA A MAGIA", descricao: "Você tem uma resistência natural aos rituais dos Tremere e aos feitiços de magos de outros credos e ordens.", custo: 2 },
    { nome: "HABILIDADE ORACULAR", descricao: "Você é capaz de ver e interpretar sinais e presságios.", custo: 3 },
    { nome: "MENTOR ESPIRITUAL", descricao: "Você tem um companheiro e guia espiritual.", custo: 3 },
    { nome: "IMUNIDADE AO LAÇO DE SANGUE ", descricao: "Você é imune ao laço de sangue. ", custo: 3 },
    { nome: "SORTE", descricao: "Você nasceu com sorte ou quem sabe 'o Diabo cuida de seus filhos'.", custo: 3 },
    { nome: "AMOR VERDADEIRO", descricao: "Você descobriu, talvez tarde demais, um amor verdadeiro. Ele, ou ela, é um mortal.", custo: 4 },
    { nome: "NOVE VIDAS", descricao: "O destino lhe garantiu a oportunidade de chegar muito perto da Morte Final e conseguir sobreviver.", custo: 6 },
    { nome: "Fé  VERDADEIRA", descricao: "Você possui uma fé profunda e um grande amor por Deus, ou como quer que você chame o Todo-Poderoso.", custo: 7 }
  ]
};

const falhas = {
  fisicos: [
    { nome: "CHEIRO DO TÚMULO ", descricao: "Você exala um odor de umidade e terra recém-revolvida, e não há perfume que seja capaz de mascarar esse cheiro.", ganho: 1 },
    { nome: "ESTATURA BAIXA", descricao: "Você está bem abaixo da altura média — 1,50 m ou menos.", ganho: 1 },
    { nome: "DEFICIÊNCIA AUDITIVA", descricao: "Sua audição é deficiente.", ganho: 1 },
    { nome: "14a GERAÇÃO", descricao: "Você foi criado há cinco anos ou menos por um Membro de 13a Geração.", ganho: 2 },
    { nome: "MORDIDA INFECCIOSA", descricao: "Você não tem as enzimas que permitem à maioria dos Membros cicatrizar as feridas causadas por sua alimentação.", ganho: 2 },
    { nome: "DEFICIÊNCIA VISUAL AMENA", descricao: "A sua visão é deficiente, mas pode ser corrigida com o uso de óculos.", ganho: 1 },
    { nome: "DEFICIÊNCIA VISUAL GRAVE", descricao: "A sua visão é deficiente e não pode ser corrigida.", ganho: 3 },
    { nome: "CAOLHO", descricao: "Você tem um olho só — escolha qual.", ganho: 2 },
    { nome: "DESFIGURADO", descricao: "Uma desfiguração horrível tornou-o feio e fácil de ser notado e lembrado.", ganho: 2 },
    { nome: "CRIANÇA", descricao: "Quando foi Abraçado, você ainda era uma criança (de cinco a dez anos), o que manteve seus Atributos Físicos subdesenvolvidos e tornou difícil a sua interação com certas camadas da sociedade mortal.", ganho: 3 },
    { nome: "DEFORMIDADE", descricao: "Você tem algum tipo de deformidade — um membro mal-formado, uma corcunda ou qualquer coisa assim — que afeta as suas habilidades físicas e a interação com as outras pessoas.", ganho: 3 },
    { nome: "ALEIJADO", descricao: "As suas pernas são danificadas, o que o impede de correr e de andar com facilidade.", ganho: 3 },
    { nome: "MONSTRUOSO", descricao: "Sua forma física foi deformada pelo Abraço e agora reflete a Besta que o consome por dentro.", ganho: 3 },
    { nome: "FERIMENTO  PERMANENTE", descricao: "Você sofreu ferimentos antes do Abraço, os quais sua transformação falhou em curar por algum motivo.", ganho: 3 },
    { nome: "CURA DEMORADA", descricao: "Você tem dificuldade em curar seus ferimentos.", ganho: 3 },
    { nome: "Vicio", descricao: "Você é viciado em alguma substância que agora precisa estar presente no sangue que você bebe", ganho: 3 },
    { nome: "Mudo", descricao: "Você não é capaz de falar.", ganho: 4 },
    { nome: "SANGUE FRACO", descricao: "Seu sangue é fino, fraco e não o sustenta direito.", ganho: 4 },
    { nome: "PORTADOR DE DOENÇA CONTAGIOSA", descricao: "Seu sangue é contaminado por uma enfermidade letal e altamente contagiosa.", ganho: 4 },
    { nome: "SURDEZ", descricao: "Você não ouve.", ganho: 4 },
    { nome: "PELE CADAVÉRICA", descricao: "Sua pele não se regenera completamente quando você sofre algum dano.", ganho: 5 },
    { nome: "CEGUEIRA", descricao: "Você não enxerga.", ganho: 6 }
  ],
  mentais: [
    { nome: "SONO PESADO", descricao: "Quando você está dormindo é muito difícil acordá-lo.", ganho: 1 },
    { nome: "PESADELOS", descricao: "Você tem pesadelos horrendos toda vez que dorme, e as lembranças deles atormentam-no durante as horas em que está desperto.", ganho: 1 },
    { nome: "FOBIA", descricao: "Você sente um medo irracional de alguma coisa. ", ganho: 2 },
    { nome: "EXCLUSÃO DE PRESA", descricao: "Você se recusa a caçar certo tipo de presa. ", ganho: 1 },
    { nome: "TIMIDEZ", descricao: "Você sente uma dificuldade enorme em lidar com pessoas e tenta evitar situações sociais sempre que possível.", ganho: 1 },
    { nome: "CORAÇÃO MOLE", descricao: "Você não aguenta ver os outros sofrerem.", ganho: 1 },
    { nome: "DlFICULDADE  DE   FALA", descricao: "Você é gago ou sofre algum outro tipo de dificuldade de fala que atrapalha a sua comunicação verbal.", ganho: 1 },
    { nome: "BAIRRISMO", descricao: "Você é extremamente apegado a um local, demarcando uma área específica como território de caça e reagindo agressivamente contra invasores.", ganho: 2 },
    { nome: "CABEÇA QUENTE", descricao: "Você se irrita facilmente.", ganho: 2 },
    { nome: "VINGANÇA", descricao: "Você tem contas a acertar, que tanto podem datar de seus dias como mortal ou depois do Abraço.", ganho: 2 },
    { nome: "AMNÉSIA", descricao: "Você é incapaz de recordar qualquer coisa sobre o seu passado.", ganho: 1 },
    { nome: "LUNÁTICO", descricao: "Você é afetado pelas fases da lua, o que aumenta a probabilidade de entrar em frenesi.", ganho: 2 },
    { nome: "VONTADE FRACA", descricao: "Você é altamente suscetível à Dominação e a ser intimidado.", ganho: 3 },
    { nome: "CONSUMO CONSPÍCUO", descricao: "Para você não basta extrair nutrientes do sangue de mortais. Você acredita que precisa consumir também o coração, o fígado e outros tecidos da vítima ricos em sangue.", ganho: 4 }
  ],
  sociais: [
    { nome: "SENHOR INDIGNO", descricao: "O seu senhor era, e talvez ainda seja, indigno de confiança e detestado por muitos Membros da cidade.", ganho: 1 },
    { nome: "SEGREDO SOMBRIO", descricao: "Você tem algum tipo de segredo que, se descoberto, seria muito embaraçoso e o tornaria um pária da comunidade vampírica local.", ganho: 1 },
    { nome: "IDENTIDADE TROCADA", descricao: "Você é parecido com a descrição de outro Membro, o que causa a confusão de identidades.", ganho: 1 },
    { nome: "RESSENTIMENTO DO SENHOR ", descricao: "Seu senhor não gosta de você e só lhe deseja o pior.", ganho: 1 },
    { nome: "INIMIGO", descricao: "Você tem um inimigo", ganho: 1 },
    { nome: "INIMIGO", descricao: "Você tem um inimigo", ganho: 2 },
    { nome: "INIMIGO", descricao: "Você tem um inimigo", ganho: 3 },
    { nome: "INIMIGO", descricao: "Você tem um inimigo", ganho: 4 },
    { nome: "INIMIGO", descricao: "Você tem um inimigo", ganho: 5 },
    { nome: "CAÇADO", descricao: "Você é perseguido por um caçador de bruxas fanático que acredita (e talvez esteja certo) que você representa um perigo para a humanidade.", ganho: 4 },
    { nome: "MEMBRO DE SEITA SOB OBSERVAÇÃO", descricao: "Você é um desertor.", ganho: 4 }
  ],
  sobrenaturais: [
    { nome: "TOQUE DE CONGELAMENTO", descricao: "As plantas murcham à sua aproximação e morrem a seu toque que retira calor dos seres vivos como se você fosse feito de gelo.", ganho: 1 },
    { nome: "REPULSA AO ALHO", descricao: "Você não tolera o alho.", ganho: 1 },
    { nome: "AMALDIÇOADO", descricao: "Você é o alvo de uma maldição sobrenatural.", ganho: 1 },
    { nome: "AMALDIÇOADO", descricao: "Você é o alvo de uma maldição sobrenatural.", ganho: 2 },
    { nome: "AMALDIÇOADO", descricao: "Você é o alvo de uma maldição sobrenatural.", ganho: 3 },
    { nome: "AMALDIÇOADO", descricao: "Você é o alvo de uma maldição sobrenatural.", ganho: 4 },
    { nome: "AMALDIÇOADO", descricao: "Você é o alvo de uma maldição sobrenatural.", ganho: 5 },
    { nome: "IMAGEM SEM REFLEXO", descricao: "Como os vampiros dos mitos, sua imagem não se reflete em espelhos.", ganho: 1 },
    { nome: "PRESENÇA SINISTRA", descricao: "Os mortais têm uma percepção inconsciente da sua natureza de morto-vivo, que os deixa inquietos e sentindo-se mal em sua presença.", ganho: 2 },
    { nome: "REPULSA A CRUZES", descricao: "Você se sente repelido pela visão de cruzes comuns, como se elas fossem símbolos sagrados.", ganho: 3 },
    { nome: "INCAPACIDADE   DE   ATRAVESSAR ÁGUA   CORRENTE", descricao: "Você acredita no velho mito e é incapaz de atravessar água corrente sem que esteja a pelo menos 15 metros acima dela.", ganho: 3 },
    { nome: "ASSOMBRADO", descricao: "Você é assombrado por um espírito zangado e atormentado, muito provavelmente uma de suas primeiras vítimas.", ganho: 3 },
    { nome: "APERTO DOS AMALDIÇOADOS", descricao: "Não existe êxtase em seu Abraço, somente terror e dor.", ganho: 4 },
    { nome: "FUTURO NEGRO", descricao: "Você foi amaldiçoado com a Morte Final, ou pior, com o sofrimento de uma agonia eterna.", ganho: 5 },
    { nome: "SENSIBILIDADE A Luz", descricao: "Você é ainda mais sensível à luz do sol do que os outros vampiros.", ganho: 5 }
  ]
};

let pontosDisponiveis = 5;
let meritosSelecionados = [];
let falhasSelecionadas = [];

function atualizarPontos() {
  const totalMeritos = meritosSelecionados.reduce((acc, m) => acc + m.custo, 0);
  const totalFalhas = falhasSelecionadas.reduce((acc, f) => acc + f.ganho, 0);
  pontosDisponiveis = 5 + totalFalhas - totalMeritos;
  document.getElementById('pontosRestantes').textContent = pontosDisponiveis;
}

function criarListaCategoria(lista, containerId, tipo, selecionadosSalvos) {
  const container = document.getElementById(containerId);

  lista.forEach((opcao, i) => {
    const isSelecionado = selecionadosSalvos.some(o => o.nome === opcao.nome);
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="checkbox" ${isSelecionado ? "checked" : ""} onchange="toggleOpcao('${tipo}', '${containerId}', ${i})"/>
        <strong>${opcao.nome}</strong> (${tipo === 'merito' ? `Custo: ${opcao.custo}` : `Ganho: ${opcao.ganho}`})<br/>
        <small>${opcao.descricao}</small>
      </label>
    `;
    container.appendChild(li);

    if (isSelecionado) {
      if (tipo === 'merito') meritosSelecionados.push(opcao);
      else falhasSelecionadas.push(opcao);
    }
  });
}

function toggleOpcao(tipo, categoriaId, index) {
  const base = tipo === 'merito' ? meritos : falhas;
  const selecionados = tipo === 'merito' ? meritosSelecionados : falhasSelecionadas;

  const categoria = categoriaId.replace(/^.*(Fisicos|Mentais|Sociais|Sobrenaturais)$/, (m, p) => p.toLowerCase());
  const lista = base[categoria];

  const item = lista[index];
  const jaTem = selecionados.includes(item);

  if (jaTem) {
    const pos = selecionados.indexOf(item);
    selecionados.splice(pos, 1);
  } else {
    selecionados.push(item);
  }

  atualizarPontos();
}

function resetPoints() {
  // Resetar arrays
  meritosSelecionados = [];
  falhasSelecionadas = [];
  pontosDisponiveis = 5;

  // Desmarcar todos os checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Atualizar os pontos na interface
  atualizarPontos();
}


function validarMeritosFalhas() {
  atualizarPontos();
  if (pontosDisponiveis !== 0) {
    alert("Você precisa gastar exatamente os 5 pontos antes de continuar.");
    return;
  }

  localStorage.setItem("ficha.meritos", JSON.stringify(meritosSelecionados));
  localStorage.setItem("ficha.falhas", JSON.stringify(falhasSelecionadas));

  nextStep();
}

window.addEventListener('DOMContentLoaded', () => {
  const salvosMeritos = JSON.parse(localStorage.getItem("ficha.meritos") || "[]");
  const salvosFalhas = JSON.parse(localStorage.getItem("ficha.falhas") || "[]");

  criarListaCategoria(meritos.fisicos, "meritosFisicos", "merito", salvosMeritos);
  criarListaCategoria(meritos.mentais, "meritosMentais", "merito", salvosMeritos);
  criarListaCategoria(meritos.sociais, "meritosSociais", "merito", salvosMeritos);
  criarListaCategoria(meritos.sobrenaturais, "meritosSobrenaturais", "merito", salvosMeritos);

  criarListaCategoria(falhas.fisicos, "falhasFisicos", "falha", salvosFalhas);
  criarListaCategoria(falhas.mentais, "falhasMentais", "falha", salvosFalhas);
  criarListaCategoria(falhas.sociais, "falhasSociais", "falha", salvosFalhas);
  criarListaCategoria(falhas.sobrenaturais, "falhasSobrenaturais", "falha", salvosFalhas);

  atualizarPontos();
});
