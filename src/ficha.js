

// Mapeamento dos tipos de dado (string) para seus valores numéricos (máximo)
// Embora você deva somar o dado, para um limite é mais comum somar o valor base (o dado).
const dadoValorMap = {
    "4": 4,
    "6": 6,
    "8": 8,
    "10": 10,
    "12": 12
    // Adicione outros se houver (ex: 1d20 para habilidades)
};

/**
 * Converte a string do dado ('1d6') para o valor numérico que representa sua força (6).
 * @param {string} dadoString - O valor do input (ex: "1d6").
 * @returns {number} O valor numérico do dado (ex: 6) ou 0 se for inválido.
 */
function getValorNumericoDoDado(dadoString) {
    // Garante que a string não seja nula ou vazia
    if (!dadoString || dadoString.trim() === '') {
        return 0;
    }
    // Normaliza a chave (ex: remove espaços) e usa o mapa
    const chave = dadoString.trim().toLowerCase();
    return dadoValorMap[chave] || 0;
}

// IDs de todos os inputs de atributo para fácil iteração
const atributoIds = ['atencao', 'potencia', 'tato', 'concentracao'];

function checkAttrLimit() {
    // 1. LER O FÔLEGO E CALCULAR O LIMITE
    const folegoInput = document.getElementById('folego');
    // Usa parseInt com base 10 e assume 0 se o valor for inválido
    const folego = parseInt(folegoInput.value, 10) || 0; 
    const limite = folego * 4;
    
    // 2. CALCULAR A SOMA DOS ATRIBUTOS
    let somaAtributos = 0;
    
    atributoIds.forEach(id => {
        const inputElement = document.getElementById(id);
        const valorDado = inputElement.value;
        somaAtributos += getValorNumericoDoDado(valorDado);
    });

    // 3. COMPARAR E DAR FEEDBACK
    
    // Encontra o elemento onde você quer mostrar a mensagem (Ex: abaixo do Fôlego)
    let feedbackElement = document.getElementById('feedback-limite');
    
    // Se o elemento de feedback ainda não existir, cria ele uma única vez
    if (!feedbackElement) {
        // Encontra o div pai do input Fôlego
        const folegoDiv = folegoInput.closest('div'); 
        
        // Cria o elemento de feedback (um <small> é ideal para notas curtas)
        feedbackElement = document.createElement('small');
        feedbackElement.id = 'feedback-limite';
        folegoDiv.appendChild(feedbackElement);
    }

    // --- Lógica de Mensagens Personalizadas ---

    // 1. Caso de EXCESSO
    if (somaAtributos > limite) {
        feedbackElement.textContent = "Esses atributos são muito altos pro Fôlego atual!";
        feedbackElement.style.color = 'red';
        document.querySelector('.ficha').classList.add('erro-limite'); 

    // 2. Caso de COMPLETO (Soma bate com o limite)
    } else if (somaAtributos === limite) {
        feedbackElement.textContent = "Seus atributos estão completos!";
        feedbackElement.style.color = 'green';
        document.querySelector('.ficha').classList.remove('erro-limite');
        
    // 3. Caso de PONTOS SOBRANDO (Soma é menor que o limite)
    } else {
        const pontosSobrantes = limite - somaAtributos;
        feedbackElement.textContent = `Você possui ${pontosSobrantes} pontos sobrando para seus atributos.`;
        feedbackElement.style.color = '#dfb921'; // Cor do seu botão/destaque para aviso
        document.querySelector('.ficha').classList.remove('erro-limite');
    }
    
    // Retorna true/false se está dentro do limite (útil para botões de AVANÇAR)
    return somaAtributos <= limite;
}

// --- FUNÇÃO DE ADICIONAR E EXCLUIR MANDINGAS ---

function adicionarMandinga() {

    const input = document.getElementById('input-mandinga');
    const lista = document.getElementById('lista-mandingas');
    const mandingaTexto = input.value.trim();

    if (mandingaTexto === "") {
        alert("A Mandinga não pode estar vazia!");
        return;
    }
    
    // 1. Cria o novo elemento (Div container)
    const novoItem = document.createElement('div');
    novoItem.classList.add('mandinga-item');
    
    const textoElement = document.createElement('span');
    textoElement.textContent = mandingaTexto;

    // 2. Cria o botão de remoção
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'x';
    btnRemover.classList.add('btn-remover');
    
    // 3. Define a função de remoção
    btnRemover.onclick = () => {
        lista.removeChild(novoItem); 
        checkMandingas(); // RECHECK APÓS EXCLUSÃO
    };
    
    // 4. Monta e adiciona o item
    novoItem.appendChild(textoElement);
    novoItem.appendChild(btnRemover);
    lista.prepend(novoItem); 

    // 5. Limpa o input e faz a verificação
    input.value = '';
    checkMandingas(); // RECHECK APÓS ADIÇÃO
}

// --- FUNÇÃO DE VERIFICAÇÃO DE LIMITE DE MANDINGAS ---

function checkMandingas() {
    const folegoInput = document.getElementById('folego');
    const folego = parseInt(folegoInput.value, 10) || 0;
    
    // A regra: 1 Mandinga a cada 3 Fôlego (Arredondado para baixo)
    const limite = Math.floor(folego / 3);
    
    const lista = document.getElementById('lista-mandingas');
    // Conta quantas Mandingas existem atualmente
    const mandingasAtuais = lista.getElementsByClassName('mandinga-item').length;
    
    // Encontra ou cria o elemento de feedback
    let feedbackElement = document.getElementById('feedback-mandingas');
    if (!feedbackElement) {
        // Assume que o h3 mais próximo (Mandingas) é o local
        const mandingasDiv = lista.closest('.mandingas-container');
        feedbackElement = document.createElement('small');
        feedbackElement.id = 'feedback-mandingas';
        mandingasDiv.appendChild(feedbackElement);
    }
    
    // --- Lógica de Mensagens Personalizadas ---
    
    // Caso 1: EXCESSO
    if (mandingasAtuais > limite) {
        feedbackElement.textContent = `⚠️ Você possui Mandingas demais! O limite é ${limite} para o Fôlego atual.`;
        feedbackElement.style.color = 'red';
    
    // Caso 2: COMPLETO
    } else if (mandingasAtuais === limite) {
        feedbackElement.textContent = `✅ Mandingas completas (${limite} de ${limite}).`;
        feedbackElement.style.color = 'green';
        
    // Caso 3: FALTANDO
    } else {
        const faltam = limite - mandingasAtuais;
        feedbackElement.textContent = `Você precisa adicionar mais ${faltam} Mandinga(s). Limite: ${limite}.`;
        feedbackElement.style.color = '#dfb921'; // Amarelo/aviso
    }
    
    // Opcional: Desativar a adição se o limite for atingido para evitar excesso
    const inputMandinga = document.getElementById('input-mandinga');
    const btnAdicionar = document.getElementById('btn-adicionar-mandinga');
    const limiteAtingido = (mandingasAtuais >= limite);
    
    if (limiteAtingido) {
        // Se já atingiu o limite, desativa o botão de adição
        btnAdicionar.disabled = true;
        inputMandinga.disabled = true;
        inputMandinga.placeholder = "Limite de Mandingas atingido.";
    } else {
        // Caso contrário, habilita
        btnAdicionar.disabled = false;
        inputMandinga.disabled = false;
        inputMandinga.placeholder = "Nova Mandinga";
    }
}