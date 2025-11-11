// Constantes de cálculo (reutilizadas das etapas anteriores)
const FolegoPorMandinga = 3;
const FolegoPorPratica = 2;

function calcularMaxMandingas(folego) {
    return Math.floor(folego / FolegoPorMandinga);
}

function calcularMaxPraticas(folego) {
    return Math.floor(folego / FolegoPorPratica);
}

// ------------------------------------------------------------------
// --- FUNÇÃO PRINCIPAL DE CARREGAMENTO DE DADOS ---
// ------------------------------------------------------------------

function carregarResumo() {
    // --- 1. Dados Iniciais ---
    const nome = localStorage.getItem('ficha.nome') || "Não preenchido";
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 0;
    const biografia = localStorage.getItem('ficha.biografia') || "Sem biografia.";

    document.getElementById('nomeDisplay').textContent = nome;
    document.getElementById('folegoDisplay').textContent = folego;
    document.getElementById('biografiaDisplay').textContent = biografia;

    // --- 2. Atributos ---
    const atributos = {
        atencao: localStorage.getItem('ficha.atributo.atencao'),
        potencia: localStorage.getItem('ficha.atributo.potencia'),
        tato: localStorage.getItem('ficha.atributo.tato'),
        concentracao: localStorage.getItem('ficha.atributo.concentracao')
    };

    const atributosList = document.getElementById('atributosList');
    atributosList.innerHTML = '';
    
    const nomesAtributos = {
        atencao: "Atenção",
        potencia: "Potência",
        tato: "Tato",
        concentracao: "Concentração"
    };

    for (const key in atributos) {
        if (atributos[key]) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${nomesAtributos[key]}:</strong> ${atributos[key]}`;
            atributosList.appendChild(li);
        }
    }

    // --- 3. Mandingas ---
    const maxMandingas = calcularMaxMandingas(folego);
    document.getElementById('limiteMandingasDisplay').textContent = maxMandingas;
    const mandingasText = localStorage.getItem('ficha.mandingas') || "";
    
    const mandingasList = document.getElementById('mandingasList');
    mandingasList.innerHTML = '';
    
    // Divide o texto do textarea em itens de lista
    const mandingasArray = mandingasText
                          .split('\n')
                          .map(item => item.trim())
                          .filter(item => item.length > 0);

    if (mandingasArray.length === 0) {
        mandingasList.innerHTML = '<li>Nenhuma mandinga selecionada.</li>';
    } else {
        mandingasArray.forEach(m => {
            const li = document.createElement('li');
            li.textContent = `• ${m}`;
            mandingasList.appendChild(li);
        });
    }


    // --- 4. Práticas/Equipamentos ---
    const maxPraticas = calcularMaxPraticas(folego);
    document.getElementById('limitePraticasDisplay').textContent = maxPraticas;
    const praticasSalvasJSON = localStorage.getItem('ficha.praticas') || '[]';
    const praticasArray = JSON.parse(praticasSalvasJSON);
    
    const praticasList = document.getElementById('praticasList');
    praticasList.innerHTML = '';
    
    if (praticasArray.length === 0) {
        praticasList.innerHTML = '<li>Nenhuma prática/equipamento selecionado.</li>';
    } else {
        praticasArray.forEach(p => {
            const li = document.createElement('li');
            li.textContent = `• ${p}`;
            praticasList.appendChild(li);
        });
    }

    
}

window.addEventListener('DOMContentLoaded', carregarResumo);

// ATENÇÃO: Adicione esta função ao seu resumo.js
function getFichaCompleta() {
    // Coletar todos os dados da ficha
    const nome = localStorage.getItem('ficha.nome') || "N/A";
    const folego = parseInt(localStorage.getItem('ficha.folego'), 10) || 0;
    const biografia = localStorage.getItem('ficha.biografia') || "N/A";

    const atributos = {
        atencao: localStorage.getItem('ficha.atributo.atencao') || "N/A",
        potencia: localStorage.getItem('ficha.atributo.potencia') || "N/A",
        tato: localStorage.getItem('ficha.atributo.tato') || "N/A",
        concentracao: localStorage.getItem('ficha.atributo.concentracao') || "N/A"
    };

    const mandingasText = localStorage.getItem('ficha.mandingas') || "";
    const mandingasArray = mandingasText
                          .split('\n')
                          .map(item => item.trim())
                          .filter(item => item.length > 0);
                          
    const praticasArray = JSON.parse(localStorage.getItem('ficha.praticas') || '[]');


    // Montar o objeto final da Ficha
    return {
        nome: nome,
        folego: folego,
        biografia: biografia,
        atributos: atributos,
        mandingas: mandingasArray,
        praticas: praticasArray,
        dataExportacao: new Date().toISOString()
    };
}

// OBS: Atualize a função exportJSON antiga para usar getFichaCompleta()
function exportJSON() {
    const fichaCompleta = getFichaCompleta();
    const nome = fichaCompleta.nome;

    const fichaJSON = JSON.stringify(fichaCompleta, null, 2);
    const nomeArquivo = `ficha-${nome.replace(/\s/g, '_')}-${fichaCompleta.folego}-perersingaem.json`;
    
    // (Restante da lógica de download JSON via Blob)
    const blob = new Blob([fichaJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Ficha de ${nome} salva com sucesso como ${nomeArquivo}!`);
}

function sendByEmail() {
    const fichaCompleta = getFichaCompleta();
    const fichaJSON = JSON.stringify(fichaCompleta, null, 2);
    
    // O Formspree não aceita JSON cru via POST. 
    // A maneira mais fácil de enviar dados complexos é usando FormData
    // ou passando o JSON como uma string dentro de um campo de formulário.

    // Cria um objeto FormData para enviar os dados
    const formData = new FormData();
    formData.append("message", fichaJSON);

    // Seu URL de Endpoint do Formspree (Substitua pelo seu ID real)
    const formspreeEndpoint = "https://formspree.io/f/xqawkqok"; 

    fetch(formspreeEndpoint, {
        method: "POST",
        body: formData, // Envia o FormData
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert(`Ficha enviada com sucesso ao Narrador!`);
        } else {
            alert("Erro ao enviar ficha.");
        }
    })
    .catch(() => alert("Erro de conexão ao tentar enviar a ficha."));
}

function exportPDF() {
    // Acessa o objeto jsPDF do escopo da biblioteca
    const { jsPDF } = window.jspdf;
    
    // Seleciona a seção que contém o resumo para ser convertida em imagem
    const element = document.getElementById('resumoCompleto'); 
    
    alert("Gerando PDF... Aguarde um momento.");

    html2canvas(element, { 
        scale: 2, // Aumenta a resolução para um PDF mais nítido
        allowTaint: true, // Permite imagens de mesma origem (se houver)
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' = portrait, 'mm' = units, 'a4' = size
        
        const imgWidth = 210; // Largura do A4 em mm
        const pageHeight = 297; // Altura do A4 em mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Se a imagem for maior que uma página, cria páginas adicionais
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        const nomeArquivo = `ficha-${document.getElementById('nomeDisplay').textContent.replace(/\s/g, '_')}-resumo.pdf`;
        pdf.save(nomeArquivo);
        alert("Download do PDF concluído!");
    }).catch(error => {
        console.error("Erro na geração do PDF:", error);
        alert("Houve um erro ao tentar gerar o PDF.");
    });
}