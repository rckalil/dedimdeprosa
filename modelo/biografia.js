// Carregar conteúdo salvo ao abrir
window.addEventListener('DOMContentLoaded', () => {
    const textoSalvo = localStorage.getItem('historia.biografia');
    if (textoSalvo) {
    document.getElementById('biografia').value = textoSalvo;
    }
});

function salvarBiografia() {
    const texto = document.getElementById('biografia').value.trim();

    if (!texto) {
    alert("Por favor, preencha a biografia antes de continuar.");
    return;
    }

    localStorage.setItem('historia.biografia', texto);
    nextStep(); // prossegue para próxima página
}