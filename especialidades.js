window.addEventListener('DOMContentLoaded', () => {
  const habilidadesEspeciaisFixas = ['oficios', 'performance', 'ciencia', 'academicos', 'expressao'];
  const habilidadesSalvas = JSON.parse(localStorage.getItem('ficha.habilidades'));
  const especializacoesSalvas = JSON.parse(localStorage.getItem('ficha.especializacoes') || "{}");
  const container = document.querySelector('.container');

  if (!habilidadesSalvas) {
    container.innerHTML = '<p>Você precisa preencher as habilidades antes de chegar aqui.</p>';
    return;
  }

  const especialContainer = document.getElementById("especializacoes");
  especialContainer.innerHTML = '<h2>Especializações</h2>';

  const jaAdicionadas = new Set();

  // Cria container para o seletor fora da função
  const selectContainer = document.createElement('div');
  selectContainer.id = "select-wrapper";

  // Adiciona as fixas
  habilidadesEspeciaisFixas.forEach(attr => {
    if (habilidadesSalvas[attr] && habilidadesSalvas[attr] >= 1) {
      adicionarCampoEspecializacao(attr, especializacoesSalvas[attr] || "", especialContainer);
      jaAdicionadas.add(attr);
    }
  });

  // Habilidades com valor ≥ 1 que ainda não foram usadas
  const selecionaveisBase = Object.keys(habilidadesSalvas).filter(attr =>
    habilidadesSalvas[attr] >= 1 && !jaAdicionadas.has(attr)
  );

  const extraEspecialJaSalva = Object.keys(especializacoesSalvas).find(k =>
    !jaAdicionadas.has(k) && selecionaveisBase.includes(k)
  );

  if (extraEspecialJaSalva) {
    adicionarCampoEspecializacao(extraEspecialJaSalva, especializacoesSalvas[extraEspecialJaSalva], especialContainer, true);
    jaAdicionadas.add(extraEspecialJaSalva);
  } else if (selecionaveisBase.length > 0) {
    criarSelect(selecionaveisBase, jaAdicionadas, especialContainer, selectContainer);
  }
});

function criarSelect(selecionaveis, jaAdicionadas, especialContainer, selectContainer) {
  selectContainer.innerHTML = `
    <label>Escolha mais uma habilidade para especializar:
      <select id="extraEspecializacaoSelect">
        <option value="">Selecione...</option>
        ${selecionaveis.map(h => `<option value="${h}">${capitalize(h)}</option>`).join('')}
      </select>
    </label>
  `;
  especialContainer.appendChild(selectContainer);

  const select = document.getElementById('extraEspecializacaoSelect');

  select.addEventListener('change', () => {
    const selected = select.value;
    if (selected && !jaAdicionadas.has(selected)) {
      adicionarCampoEspecializacao(selected, "", especialContainer, true, selectContainer);
      jaAdicionadas.add(selected);
      selectContainer.remove(); // remove o select após seleção
    }
  });
}

function adicionarCampoEspecializacao(attr, valor, container, isExtra = false, selectContainer = null) {
  const wrapper = document.createElement('div');
  wrapper.className = "especializacao-wrapper";
  wrapper.dataset.attr = attr;

  const label = document.createElement('label');
  label.textContent = `Especialização em ${capitalize(attr)}:`;

  const input = document.createElement('input');
  input.type = 'text';
  input.name = attr;
  input.placeholder = `Descreva a especialização em ${capitalize(attr)}`;
  input.value = valor || "";

  label.appendChild(input);
  wrapper.appendChild(label);

  // Adiciona botão de remoção se for a quinta extra
  if (isExtra) {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.type = 'button';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => {
      wrapper.remove();
      // Remove da lista de adicionadas
      const jaAdicionadas = new Set(
        Array.from(document.querySelectorAll('.especializacao-wrapper')).map(div => div.dataset.attr)
      );
      const habilidadesSalvas = JSON.parse(localStorage.getItem('ficha.habilidades'));
      const selecionaveis = Object.keys(habilidadesSalvas).filter(attr =>
        habilidadesSalvas[attr] >= 1 && !jaAdicionadas.has(attr)
      );
      const novoSelectContainer = document.createElement('div');
      novoSelectContainer.id = "select-wrapper";
      criarSelect(selecionaveis, jaAdicionadas, container, novoSelectContainer);
    });

    wrapper.appendChild(removeBtn);
  }

  container.appendChild(wrapper);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function salvarEspecializacoes() {
  const inputs = document.querySelectorAll('#especializacoes input');
  const especializacoes = {};

  let camposIncompletos = false;

  inputs.forEach(input => {
    const valor = input.value.trim();
    if (!valor) {
      camposIncompletos = true;
    }
    if (valor) {
      especializacoes[input.name] = valor;
    }
  });

  if (camposIncompletos) {
    alert("Por favor, preencha todas as especializações exibidas antes de continuar.");
    return;
  }

  localStorage.setItem('ficha.especializacoes', JSON.stringify(especializacoes));
  nextStep();
}

