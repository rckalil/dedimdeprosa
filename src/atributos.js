// === Mapeamento de Dados ===
const dadoValorMap = {
    "1d4": 4,   // Valores numéricos correspondentes ao HTML
    "1d6": 6,
    "1d8": 8,
    "1d10": 10,
    "1d12": 12
};

function getValorNumericoDoDado(dadoString) {
    if (!dadoString || dadoString.trim() === '') {
        return 0;
    }
    const chave = dadoString.trim();
    return dadoValorMap[chave] || 0;
}

const atributoIds = ['atencao', 'potencia', 'tato', 'concentracao'];

// === Checagem de Limite (Refatorada) ===
function checkAttrLimit() {
    // 1. LER O FÔLEGO E CALCULAR O LIMITE (Direto do localStorage, como na inicialização)
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 4;
    const limite = folego * 4;
    
    let somaAtributos = 0;
    
    atributoIds.forEach(id => {
        const inputElement = document.getElementById(id);
        const valorDado = inputElement.value;
        somaAtributos += getValorNumericoDoDado(valorDado);
    });

    // 2. ENCONTRA O FEEDBACK ELEMENT (Assumindo que ele está no HTML)
    let feedbackElement = document.getElementById('feedback-limite');
    
    if (!feedbackElement) {
        // Se o elemento não existir, não faz o feedback visual/texto
        return somaAtributos <= limite; 
    }

    // --- Lógica de Mensagens Personalizadas ---
    const fichaElement = document.querySelector('.container'); // Elemento para aplicar estilo de erro
    
    if (somaAtributos > limite) {
        feedbackElement.textContent = "⚠️ Esses atributos são muito altos pro Fôlego atual!";
        feedbackElement.style.color = 'red';
        fichaElement.classList.add('erro-limite'); 

    } else if (somaAtributos === limite) {
        feedbackElement.textContent = "✅ Seus atributos estão completos!";
        feedbackElement.style.color = 'green';
        fichaElement.classList.remove('erro-limite');
        
    } else {
        const pontosSobrantes = limite - somaAtributos;
        feedbackElement.textContent = `Você possui ${pontosSobrantes} pontos sobrando para seus atributos.`;
        feedbackElement.style.color = '#dfb921';
        fichaElement.classList.remove('erro-limite');
    }
    
    return somaAtributos <= limite;
}


// ------------------------------------------------------------------
// --- LÓGICA DE CARREGAMENTO (Mantida) ---
// ------------------------------------------------------------------

window.addEventListener('DOMContentLoaded', () => {
    // ... (Fôlego e limite carregados e exibidos) ...

    // 3. Carregar e preencher os inputs/SELECTS com os valores salvos
    atributoIds.forEach(id => {
        const valorSalvo = localStorage.getItem(`ficha.atributo.${id}`) || "";
        const selectElement = document.getElementById(id);
        
        // Verifica se o valor salvo está nas opções (se for "1d6", seleciona a opção "1d6")
        if (selectElement) {
            selectElement.value = valorSalvo;
        }
    });

    // 4. Rodar o check inicial para exibir o feedback
    checkAttrLimit(); 
});


// ------------------------------------------------------------------
// --- LÓGICA DE VALIDAÇÃO E SALVAMENTO (Mantida) ---
// ------------------------------------------------------------------

function validateAndSaveAtributos(direction) {
    let todosPreenchidos = true;
    let dadosValidos = true; // Com select, dadosValidos será sempre true, mas mantemos o check para segurança

    // 1. Verificar preenchimento e salvar valores
    atributoIds.forEach(id => {
        const selectElement = document.getElementById(id);
        const valorDado = selectElement.value.trim(); // Pega o valor do select

        if (!valorDado) {
            todosPreenchidos = false;
        }
        // ... (resto da lógica de getValorNumericoDoDado e salvamento) ...
        
        // Salvar o valor do atributo 
        localStorage.setItem(`ficha.atributo.${id}`, valorDado);
    });

    // 2. Verificar limites e feedback
    const dentroDoLimite = checkAttrLimit(); 

    if (!todosPreenchidos) {
        alert("Por favor, preencha todos os 4 atributos.");
        return;
    }
    
    // A checagem de dadosValidos não é estritamente necessária com o select,
    // mas pode ser mantida para verificar o valor vazio ("Selecione o Dado").
    
    if (!dentroDoLimite) {
        alert("A soma dos seus atributos ultrapassa o limite do Fôlego! Por favor, ajuste.");
        return;
    }
    
    // 3. Navegação
    if (direction==='front'){
        nextStep();
    }
    else if (direction==='back') {
        prevStep();
    }
}