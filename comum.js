const pages = [
  "index.html",
  "perfil.html",
  "atributos.html",
  "habilidades.html",
  "especialidades.html",
  "disciplinas.html",
  "meritos_falhas.html",
  "historia.html",
  "biografia.html",
  "exportar.html"
];

function getBasePath() {
  // Garante que funcione mesmo se você mover o projeto depois
  const pathParts = window.location.pathname.split("/");
  const repoName = pathParts[1]; // "vampiro"
  return "/" + repoName + "/";
}

function nextStep() {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage || "index.html");

  if (currentIndex >= 0 && currentIndex < pages.length - 1) {
    if (currentIndex === 0) {
      localStorage.clear();
    }
    const nextPage = pages[currentIndex + 1];
    window.location.href = getBasePath() + nextPage;
  }
}

function prevStep() {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage || "index.html");

  if (currentIndex > 0) {
    const prevPage = pages[currentIndex - 1];
    window.location.href = getBasePath() + prevPage;
  }
}
