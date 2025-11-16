// Constante para o cálculo
const FolegoPorMandinga = 3;

function calcularMaxMandingas(folego) {
    // Math.floor garante que apenas mandingas COMPLETAS sejam contadas.
    // Ex: Fôlego 5 -> 5 / 3 = 1.66 -> 1 Mandinga.
    return Math.floor(folego / FolegoPorMandinga);
}

// ------------------------------------------------------------------
// --- LÓGICA DE CARREGAMENTO E DISPLAY ---
// ------------------------------------------------------------------

window.addEventListener('DOMContentLoaded', () => {
    // 1. Carregar Fôlego salvo e calcular o limite
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 4;
    const maxMandingas = calcularMaxMandingas(folego);

    // 2. Exibir o Fôlego e o Limite na tela
    document.getElementById('folegoDisplay').textContent = folego;
    document.getElementById('maxMandingasDisplay').textContent = maxMandingas;

    // 3. Carregar e preencher o textarea com o conteúdo salvo
    const mandingasSalvas = localStorage.getItem('ficha.mandingas') || "";
    document.getElementById('mandingasInput').value = mandingasSalvas;
    
    // 4. Rodar o check inicial para exibir o feedback
    checkMandingaLimit();
});


// ------------------------------------------------------------------
// --- LÓGICA DE VALIDAÇÃO E FEEDBACK ---
// ------------------------------------------------------------------

function checkMandingaLimit() {
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 4;
    const maxMandingas = calcularMaxMandingas(folego);
    
    const mandingasText = document.getElementById('mandingasInput').value.trim();
    const feedbackElement = document.getElementById('feedback-mandingas');
    
    // Divide o texto em linhas, filtra linhas vazias e conta as Mandingas válidas.
    // A função .split('\n') funciona bem para contagem de itens em textarea.
    const mandingasList = mandingasText
                          .split('\n')
                          .map(item => item.trim()) // Remove espaços em branco nas extremidades
                          .filter(item => item.length > 0); // Remove linhas vazias

    const mandingasAtuais = mandingasList.length;

    let dentroDoLimite = true;
    
    if (mandingasAtuais > maxMandingas) {
        const excesso = mandingasAtuais - maxMandingas;
        feedbackElement.textContent = `❌ Você excedeu o limite! Remova ${excesso} Mandinga(s).`;
        feedbackElement.style.color = 'red';
        dentroDoLimite = false;
    } else if (mandingasAtuais === maxMandingas) {
        feedbackElement.textContent = `✅ Limite de ${maxMandingas} Mandinga(s) alcançado!`;
        feedbackElement.style.color = 'green';
    } else {
        const restantes = maxMandingas - mandingasAtuais;
        feedbackElement.textContent = `Você ainda pode adicionar ${restantes} Mandinga(s) (Opcional).`;
        feedbackElement.style.color = '#dfb921';
    }
    
    return dentroDoLimite;
}

// Adiciona o listener de input para feedback em tempo real
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mandingasInput').addEventListener('input', checkMandingaLimit);
});


function validateAndSaveMandingas(direction) {
    const mandingasText = document.getElementById('mandingasInput').value.trim();
    
    // 1. Verificar limite
    const dentroDoLimite = checkMandingaLimit();

    if (!dentroDoLimite) {
        alert("Atenção: Você excedeu o número máximo de Mandingas. Por favor, ajuste antes de prosseguir.");
        return;
    }
    
    // 2. Salvar (salva o texto bruto do textarea)
    localStorage.setItem('ficha.mandingas', mandingasText);

    // 3. Se tudo estiver OK, avança para a próxima página
    if (direction==='front'){
        nextStep();
    }
    else if (direction==='back') {
        prevStep();
    }
    
}