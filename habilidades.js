// Certifique-se de definir distributionForm e distributions antes de usá-los
const distributionForm = document.getElementById('distributionForm');
const distributions = {
    // Exemplo de distribuições, ajuste conforme necessário
    'jack': [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1,1 , 1, 1, 1, 1, 1, 1],
    'balanced': [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
    'specialist': [4, 3, 3, 3, 2, 2, 2, 1, 1, 1]
};

var selected = 'jack'; // ou outra distribuição padrão
// Valores iniciais para o pool
var values = distributions['jack']; // ou outra distribuição padrão

function updateValuesPool() {
    selected = distributionForm.querySelector('input[name="distribution"]:checked').value;
    values = distributions[selected];
    createValuesPool(values);
}


distributionForm.addEventListener('change', updateValuesPool);



function createValuesPool(values) {
    // DRAG & DROP – cria os valores no pool
    const pool = document.getElementById("valuesPool");

    document.querySelectorAll('.dropzone').forEach(zone => {
        const existing = zone.querySelector(".draggable");
        if (existing) {
            pool.appendChild(existing);
            zone.innerHTML = zone.dataset.attr + "<br/>";
            zone.classList.remove("filled");
        }
    });

    pool.innerHTML = ''; // Limpa o pool antes de adicionar novos valores

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
}

window.addEventListener('DOMContentLoaded', () => {
  createValuesPool(values);
  updateValuesPool();

  // ✅ ATRIBUTOS – só agora, depois que os draggables existem
  const savedAtributos = JSON.parse(localStorage.getItem("ficha.habilidades"));
  selected = localStorage.getItem('ficha.distribution') || 'jack';
  values = distributions[selected] || distributions['jack'];
  distributionForm.querySelector(`input[name="distribution"][value="${selected}"]`).checked = true;
  createValuesPool(values);
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
});

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
function validateDraggedHabilities() {
    window.validationError = false;
  const used = [];
  const habilidades = {};

  let error = false;

    const draggables = Array.from(document.querySelectorAll("#valuesPool .draggable"));
    if (draggables.length > 0) {
        alert("Todos os números devem ser usados. Distribua todos os valores antes de continuar.");
        window.validationError = true;
        error = true;
        return;
    }

  document.querySelectorAll(".dropzone").forEach(zone => {
    used.push(zone.querySelector(".draggable"));
    const valBox = zone.querySelector(".draggable") || 0;
    const attr = zone.dataset.attr;
    habilidades[attr] = valBox ? parseInt(valBox.textContent) : 0;
    console.log(`Atributo: ${attr}, Valor: ${habilidades[attr]}`);

  });

  if (window.validationError) return;

  // Armazena os habilidades para exportação
  localStorage.setItem('ficha.distribution', distributionForm.querySelector('input[name="distribution"]:checked').value);
  localStorage.setItem('ficha.habilidades', JSON.stringify(habilidades));
  nextStep();
  }