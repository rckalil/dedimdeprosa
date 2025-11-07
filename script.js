let currentStep = 0;

const pages = [
  "index.html",
  "historia.html",
  "atributos.html",
  "exportar.html"
];

let clanData = {};

const clans = {
  "Brujah": "Rebeldes apaixonados, guerreiros por natureza, com forte impulso por liberdade.",
  "Gangrel": "Sobreviventes ferozes, ligados à natureza e com instintos animalescos.",
  "Malkaviano": "Portadores de uma loucura profética, com uma visão distorcida e profunda do mundo.",
  "Nosferato": "Horrendamente deformados, mestres do segredo e da espionagem.",
  "Toreador": "Apaixonados pela arte, beleza e emoção — verdadeiros estetas imortais.",
  "Tremere": "Feiticeiros do sangue, estruturados, hierárquicos e misteriosos.",
  "Ventrue": "Líderes natos, nobres, seletivos e obcecados por controle.",
  "Banu haquim": "Juízes e assassinos, leais a antigos códigos de honra.",
  "Lasombra": "Controladores das sombras, ambiciosos, frios e manipuladores.",
  "O Ministério": "Sedutores e corruptores, mestres da tentação e da transgressão.",
  "Ravnos": "Viajantes enganadores, com poderes de ilusão e liberdade extrema.",
  "Giovanni": "Necromantes poderosos, ligados à morte, riquezas e à própria família.",
  "Tzimisce": "Modeladores de carne e osso, obcecados por controle e território."
}

// Valores fixos para drag
const values = [4, 3, 3, 3, 2, 2, 2, 2, 1];

window.addEventListener('DOMContentLoaded', () => {
  // DRAG & DROP – cria os valores no pool
  const pool = document.getElementById("valuesPool");

  values.forEach((val, idx) => {
    const span = document.createElement("div");
    span.className = "draggable";
    span.draggable = true;
    span.textContent = val;
    span.id = `val-${idx}`;
    span.addEventListener("dragstart", dragStart);
    pool.appendChild(span);
  });

  document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("drop", dropValue);
  });

  // ✅ ATRIBUTOS – só agora, depois que os draggables existem
  const savedAtributos = JSON.parse(localStorage.getItem("ficha.atributos"));
  if (savedAtributos) {
    for (const attr in savedAtributos) {
      const dropzone = document.querySelector(`.dropzone[data-attr="${attr}"]`);
      const val = savedAtributos[attr];

      const span = Array.from(document.querySelectorAll("#valuesPool .draggable")).find(
        el => parseInt(el.textContent) === val
      );

      if (span && dropzone) {
        dropzone.innerHTML = dropzone.dataset.attr + "<br/>";
        dropzone.appendChild(span);
        dropzone.classList.add("filled");
      }
    }
  }

  // CLÃ – manter como está
  const clanSelect = document.getElementById('clan');
  const descBox = document.getElementById('clanDescription');
  clanSelect.innerHTML = '<option value="">Selecione um clã</option>';
  for (const clan in clans) {
    clanSelect.innerHTML += `<option value="${clan}">${clan}</option>`;
    clanData[clan] = clans[clan];
  }

  clanSelect.addEventListener('change', function () {
    const selectedClan = this.value;
    descBox.textContent = clanData[selectedClan] || '';
  });

  const initialClan = clanSelect.value;
  descBox.textContent = clanData[initialClan] || '';

  // Preenche os campos da página de história com dados do localStorage, se existirem
  if (window.location.pathname.endsWith("historia.html")) {
    const playerName = localStorage.getItem('ficha.playerName') || "";
    const characterName = localStorage.getItem('ficha.characterName') || "";
    const clan = localStorage.getItem('ficha.clan') || "";

    const playerNameInput = document.getElementById('playerName');
    const characterNameInput = document.getElementById('characterName');
    const clanSelect = document.getElementById('clan');

    if (playerNameInput) playerNameInput.value = playerName;
    if (characterNameInput) characterNameInput.value = characterName;
    if (clanSelect) clanSelect.value = clan;
  }
});



document.getElementById('clan').addEventListener('change', function () {
  const selectedClan = this.value;
  const descBox = document.getElementById('clanDescription');
  descBox.textContent = clanData[selectedClan] || '';
});


function nextStep() {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage);

  if (currentIndex >= 0 && currentIndex < pages.length - 1) {
    if (currentIndex === 0) {
      localStorage.clear();
    }
    const nextPage = pages[currentIndex + 1];
    window.location.href = nextPage;
  }


}


function prevStep() {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage);

  if (currentIndex > 0) {
    const prevPage = pages[currentIndex - 1];
    window.location.href = prevPage;
  }
}





function exportJSON() {
  const ficha = {
    jogador: localStorage.getItem('ficha.playerName') || "",
    personagem: localStorage.getItem('ficha.characterName') || "",
    clan: localStorage.getItem('ficha.clan') || "",
    atributos: JSON.parse(localStorage.getItem('ficha.atributos') || "{}")
  };

  // Ordenar atributos por nome
  const atributosOrdenados = {};
  Object.keys(ficha.atributos)
    .sort()
    .forEach(key => {
      atributosOrdenados[key] = ficha.atributos[key];
    });

  ficha.atributos = atributosOrdenados;

  const json = JSON.stringify(ficha, null, 2);
  document.getElementById('jsonOutput').textContent = json;
}





function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dropValue(e) {
  const data = e.dataTransfer.getData("text/plain");
  const dragged = document.getElementById(data);

  if (!dragged) return;

  const dropzone = e.currentTarget;

  // Se já tem um valor, devolve ao pool
  const existing = dropzone.querySelector(".draggable");
  if (existing) {
    document.getElementById("valuesPool").appendChild(existing);
  }

  dropzone.innerHTML = dropzone.dataset.attr + "<br/>";
  dropzone.appendChild(dragged);
  dropzone.classList.add("filled");
}

// Validação final
function validateDraggedAttributes() {
  window.validationError = false;
  const used = [];
  const atributos = {};

  let error = false;

  document.querySelectorAll(".dropzone").forEach(zone => {
    if (error) return;
    const valBox = zone.querySelector(".draggable");
    const attr = zone.dataset.attr;
    if (!valBox) {
      alert("Todos os atributos devem receber um valor.");
      window.validationError = true;
      error = true;
      return;
    }

    const val = parseInt(valBox.textContent);
    if (used.includes(valBox.id)) {
      alert("Valor duplicado detectado. Cada número deve ser usado apenas uma vez.");
      window.validationError = true;
      error = true;
      return;
    }

    used.push(valBox.id);
    atributos[attr] = val;
  });

  if (window.validationError) return;

  // Armazena os atributos para exportação
  localStorage.setItem('ficha.atributos', JSON.stringify(atributos));
  nextStep();
}

function saveBasicInfo() {
  const playerName = document.getElementById('playerName').value;
  const characterName = document.getElementById('characterName').value;
  const clan = document.getElementById('clan').value;

  localStorage.setItem('ficha.playerName', playerName);
  localStorage.setItem('ficha.characterName', characterName);
  localStorage.setItem('ficha.clan', clan);

  nextStep();
}
