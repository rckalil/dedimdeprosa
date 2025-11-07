const pages = [
  "index.html",
  "começo.html",
];

function getBasePath() {
  const pathParts = window.location.pathname.split("/");
  const isLocal = window.location.protocol.includes("file");

  if (isLocal) {
    // Lógica para caminhos locais (file:///C:/...)
    // 1. Filtra as strings vazias (que ocorrem no início do split)
    const cleanParts = pathParts.filter(Boolean); 
    
    // 2. O nome do projeto 'dedimdeprosa' é o último item (excluindo index.html)
    //    Para o seu path, ele é o penúltimo item. Vamos encontrá-lo!
    
    // Se você estiver em '.../dedimdeprosa/index.html', 
    // o nome do projeto (dedimdeprosa) será o penúltimo (índice: -2).
    // O .at() é a forma moderna e segura de fazer isso.
    const projectFolder = cleanParts.at(-2); 

    // O caminho local precisa do prefixo 'file:///' e dos diretórios anteriores
    // Para simplificar, vamos retornar o caminho relativo se for local.
    
    // Se você quer que o caminho funcione como:
    // C:/.../dedimdeprosa/site/começo.html
    // E você está em:
    // C:/.../dedimdeprosa/index.html
    // O caminho base é simplesmente o nome da pasta (site/)
    return "site/"; 
    
  } else {
    // Lógica para GitHub Pages (http/https)
    
    // 1. Filtra strings vazias
    const cleanParts = pathParts.filter(Boolean);
    
    // 2. O nome do repositório (ex: "dedimdeprosa") é geralmente o primeiro item
    const repoName = cleanParts[0]; 

    // Retorna: /dedimdeprosa/site/
    if (repoName) {
      return "/" + repoName + "/site/";
    }
    // Caso especial onde o site está na raiz do domínio
    return "/site/";
  }
}

// As funções nextStep e prevStep não precisam de alteração, 
// pois elas usam o getBasePath() que foi corrigido.

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