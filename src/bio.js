// Carregar e preencher os campos com dados do localStorage ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const nomeSalvo = localStorage.getItem('ficha.nome') || "";
    const folegoSalvo = localStorage.getItem('ficha.folego') || "4";
    const biografiaSalva = localStorage.getItem('ficha.biografia') || "";

    document.getElementById('nomePersonagem').value = nomeSalvo;
    document.getElementById('folego').value = folegoSalvo;
    document.getElementById('biografia').value = biografiaSalva;
});

function validateAndSaveInicio(direction) {
    const nome = document.getElementById('nomePersonagem').value.trim();
    const folego = parseInt(document.getElementById('folego').value, 10);
    const biografia = document.getElementById('biografia').value.trim();

    // 1. Validação de Campos
    if (!nome) {
        alert("Por favor, insira o nome do seu personagem.");
        return;
    }
    if (isNaN(folego) || folego < 4) {
        alert("O Fôlego deve ser um número válido e no mínimo 4.");
        return;
    }
    if (!biografia) {
        alert("Por favor, preencha a biografia.");
        return;
    }

    // 2. Salvar no localStorage
    localStorage.setItem('ficha.nome', nome);
    localStorage.setItem('ficha.folego', folego);
    localStorage.setItem('ficha.biografia', biografia);

    // 3. Prosseguir para a próxima etapa (a página de Atributos, por exemplo)
    if (direction==='front'){
        nextStep();
    }
    else if (direction==='back') {
        prevStep();
    }
}