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