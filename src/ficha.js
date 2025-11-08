

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