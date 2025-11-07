let clanData = {};

const clans = {
  "Brujah": "O clã Brujah é principalmente composto de rebeldes, com e sem causa. Individualistas, extrovertidos e turbulentos, os Brujah carregam o desejo da mudança social dentro de seus corações mortos e a hierarquia do clã contém alguns dos Membros mais violentos da Camaru=illa. Muitos vampiros vêem os Brujah como nada mais do que marginais e desencamihados, mas a verdade dos fatos é que uma paixão fenuína se esconde por trás de suas polêmicas.",
  "Gangrel": "De todos os vampiros, os Grangrel são talvez os que mais se aproximam de sua natureza interna. Estes nômades solitários desprezam a repressão da sociedade, preferindo o conforto de áreas selvagens. Não se sabe como eles evitam a fúria dos lobisomens; talvez isso tenha algo a ver com o fato dos Grangrel também serem metamorfos. Quando um mortal fala sobre um vampiro se transformando em lobo ou morcego, ele provavelmente está falando de um Grangrel.",
  "Malkaviano": "Até mesmo outros Vampiros temem os Malkavianos. O sangue amaldiçoado do clã poluiu suas mentes, e o resultado é que todos os Malkavianos do mundo são incuravelmente insanos. E o que é pior, a loucura de um Malkaviano pode tomar praticamente qualquer forma, desde tendências homicidas irresistíveis até catatonia iminente. Em muitos casos, não há como diferencias um Malkaviano de um membro 'são' de outros clãs. Os poucos cuja psicose é imediatamente óbvia são os vampiros mais apavorantes que se pode encontrar nas ruas.",
  "Nosferatu": "As crianças de Caim são chamadas de 'Os Amaldiçoados' e nenhum vampiro personifica tão completamente este nome quanto os miseráveis do Clã Nosferatu. Enquanto os outros vampiros continuam com a aparência humana e podem participar da sociedade humana, os Nosferatu são distorcidos e deformados pela maldição do vmapirismo. Outros Membros falam com horror sobre a marca que Caim colocou cobre todo o clã devido {as horrorosas façanhas realizadas pelo seu fundador Sntediluviano. Por causa disso, os Nosferatu são desprezados e ignorados pelas outras crianças de Caim, que os consideram asquerosos e só interagem com eles quando necessário.",
  "Toreador": "Os Toreador são chamados de muitos nomes - 'degenerados', 'artistas', 'fingidos' e 'hedonistas' são apenas alguns. Mas qualquer um destes apelidos grosseiros prestam um desserviço ao clã. Dependendo de sua individualidade e de seu temperamento, os Toreador são alternadamente elegantes e extravagantes, brilhante e lúdicos, visionários e dispersos. Talvez o único imperativo que pode se aplicar ao clã seja o zelo estático de seus membros. O que quer que um Toreador faça, ele fará com paixão. O que quer que um Toreador seja, ele será com paixão.",
  "Tremere": "Vistos como pavorosos, pouco confiáveis, temíveis ou ultrajados, os vampiros do Clã Tremere são tudo, menos ignorados. Aqueles que já ouviram falar dos afazeres do clã normalmente suspeitam dele, e por uma boa razão - os Feiticeiros são chamados assim corretamente. Através de seus próprios artifícios, eles aprenderam a dominar uma forma de feitiçaria vampírica, completa com rituais e magias, que são tão potentes - se não mais - do que qualquer outro poder derivado do Sangue. Somados à rígida hierarquia do clã e à latente ambição comum entre os Feiticeiros, este poder é de fato algo pertubador para aqueles que sabem do que um Tremere é capaz.",
  "Ventrue": "Os Membros do Clã Ventrue têma  reputação de serem honrados, gentis e de gosto impecável. Desde os tempos remotos, os Ventrue têm sido o clã de liderança, reforçando as tradições antigas e procurando moldar o destino dos Membros. Nas noites ancestrais, os Ventrue eram escolhidos entre nobres, príncipes mercantes ou outros controladores do poder. Nos tempos modernos, o clã recruta seus membros de ricas famílias tradicionais, impiedosos executivos emergentes e políticos. Qualquer que seja a origme, os vampiros Ventrue preservam a estabilidade e mantêm a ordem da Camarilla. Outros Membros frequentemente confundem isso com arrogância ou avareza, mas para o Ventrue, seu papel de apstor é mais uma responsabilidade do que uma honra.",
  "Lasombra": "O clã Lasombra caiu em desgraça - e os seus membros gostam disso. Ao mesmo tempo graciosos e predatórios, os Lasombra guiam - se necessário pelo chicote - O Sabá a ser uma força implacável. Voltando suas costas aos humanos que um dia foram, os Lasombra se entregaram por inteiro à sombria majestade do Abraço. Assassinatos, frenesi, depredação: por que temer essas coisas, muitos Lasombra se perguntam, quando se é um vampiro? Ao contrário dos Tzimisce, contudo, os Lasombra não procuram rejeitar tudo o que é mortal, mas sim moldar o mmundo ao seu prazer.",
  "Tzimisce": "Se o clã Lasombra é o coração do Sabá, o clã Tzimisce é a alma. Até mesmo outros vampiros ficam inquietos perto destes misteriosos Membros, cujo apeliido de 'Demônios' lhes foi atribuido em noites passadas, por Membros de várias outras linhagens. A Disciplina Vicissitude, a marca registrada dos Tzimisce, pe motivo de grande pavor: histórias contam sobre desfiguramentos mutildores infligidos em caprochosas e horripilantes 'experiências', além de torturas com requintes além da compreensão e vigor humanos - ou vampíricos.",
  "Assamita": "Os Assamitas vêm dos desolados desertos do Leste e trazem consigo miasmas de terror. Os Assamitas são conhecidos dentro da sociedade dos vampiros como um clã de assassinos sanguinários, trabalhando para quem quer que possa pagar seu preço. O preço que eles cobram por seus serviços é a vitae de outros Membros, pois para os Assamitas, a diablerie é o maior dos sacramentos.",
  "Setita": "Os Seguidores de Set, chamados 'Setitas', talvez sejam o menos confiável de todos os clãs. Seus laços com o arquétipo mitológico da Serpente são bem conhecidos e apoiados por seus pertubadores poderes. Eles são guardiões do conhecimento que, de acordo com suas reivindicações, antecedem até mesmo a Primeira Cidade. Quando eles chegam a uma cidade, a estrutura de poder dos Cainitas quase que inevitavelmente desmorona. Porém, o mais enervante de tudo é que eles, como um clã, compartilham de uma fé poderosa e negra - a crença de que o sangue de deuses pulsa em suas veias geladas.",
  "Giovanni": "Os Giovanni são respeitosos, gentis e bem-educados. Podres de ricos, o Clã Giovanni rastreia suas raízes até antes do Renascimentom em uma família de príncipes mercantes. O clã ainda mantém sua casa original em Veneza, em uma loggía milenar pouco afastada do coração da cidade. Nenhum outro clã exibe tanta humildade e decoro como fazem os Giovanni. E nenhum outro clã esconde seus blasfemos segredos tão bem.",
  "Ravnos": "Se um clã pode ser conhecido por seu malicioso senso de humor negro, este clã é o Ravnos. Estes Cainitas são engandores de primeira, tramando ilusões e mentiras em esquemas elaborados para afastar os tolos do caminho do que quer que os Ravnos estejam ambicionando - seja riqueza, sangue ou até mesmo a liberdade de suas vítimas. Como Mefistófeles, os Ravos exercem seus negócios demoníacos com quem bem entendem e afligem os que não são capazes de pagar os custos sombrios."
}

window.addEventListener('DOMContentLoaded', () => {
  // CLÃ – preencher o select
  const clanSelect = document.getElementById('clan');
  const descBox = document.getElementById('clanDescription');

  clanSelect.innerHTML = '<option value="">Selecione um clã</option>';
  for (const clan in clans) {
    clanSelect.innerHTML += `<option value="${clan}">${clan}</option>`;
    clanData[clan] = clans[clan];
  }

  // Preenche os campos com dados do localStorage
  const playerName = localStorage.getItem('ficha.playerName') || "";
  const characterName = localStorage.getItem('ficha.characterName') || "";
  const clan = localStorage.getItem('ficha.clan') || "";

  const playerNameInput = document.getElementById('playerName');
  const characterNameInput = document.getElementById('characterName');

  if (playerNameInput) playerNameInput.value = playerName;
  if (characterNameInput) characterNameInput.value = characterName;
  if (clanSelect) clanSelect.value = clan;

  // Mostra a descrição do clã salvo, se houver
  if (descBox && clan) {
    descBox.textContent = clanData[clan] || '';
  }

  // Atualiza a descrição quando o usuário muda de clã
  clanSelect.addEventListener('change', function () {
    const selectedClan = this.value;
    descBox.textContent = clanData[selectedClan] || '';
  });
});

function saveBasicInfo() {
  const playerName = document.getElementById('playerName').value;
  const characterName = document.getElementById('characterName').value;
  const clan = document.getElementById('clan').value;

  localStorage.setItem('ficha.playerName', playerName);
  localStorage.setItem('ficha.characterName', characterName);
  localStorage.setItem('ficha.clan', clan);

  nextStep();
}

function validateInfo() {
  const playerName = document.getElementById('playerName').value.trim();
  const characterName = document.getElementById('characterName').value.trim();
  const clan = document.getElementById('clan').value;
  if (!playerName || !characterName || !clan) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  saveBasicInfo();
}

function confirmReset() {
  const confirmar = confirm("Tem certeza de que deseja começar tudo de novo? Todas as seleções serão perdidas.");
  if (confirmar) {
    prevStep();
  }
}
