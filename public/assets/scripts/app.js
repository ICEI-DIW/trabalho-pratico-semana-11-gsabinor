// Cards Receitas em Destaque na Página Inicial (index.html)
if (document.getElementById("lista-receitas")) {
  const container = document.getElementById("lista-receitas");

  fetch("http://localhost:3000/receitas")
    .then(res => res.json())
    .then(receitas => {
      receitas.filter(receita => receita.destaque).forEach(receita => {
        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4 mb-4";
        card.innerHTML = `
          <div class="card h-100">
            <img src="${receita.imagem}" class="card-img-top" alt="${receita.titulo}">
            <div class="card-body text-center d-flex flex-column">
              <h5 class="card-title">${receita.titulo}</h5>
              <p class="card-text">${receita.descricao}</p>
              <a href="detalhes.html?id=${receita.id}" class="btn btn-warning mt-auto">Ver Detalhes</a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Erro ao carregar receitas:", err));
}

// Exibir detalhes da receita na página detalhes.html
if (document.getElementById("detalhe-receita")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  fetch(`http://localhost:3000/receitas/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Receita não encontrada");
      return res.json();
    })
    .then(receita => {
      let galeriaHTML = "";

      document.getElementById("page-title").innerText = `${receita.titulo} - Detalhes`;

      if (receita.imagens_galeria && receita.imagens_galeria.length > 0) {
        galeriaHTML = `
          <section class="container my-5">
            <h2 class="mb-4">Mais imagens da receita</h2>
            <div class="row">
              ${receita.imagens_galeria.map(imagem => `
                <div class="col-md-4 mb-3">
                  <img src="${imagem.src}" class="img-fluid rounded" alt="${imagem.descricao}">
                  <p class="mt-2 text-center">${imagem.descricao}</p>
                </div>
              `).join('')}
            </div>
          </section>
        `;
      }

      document.getElementById("detalhe-receita").innerHTML = `
        <section class="container my-5">
          <h1 class="mb-3">${receita.titulo}</h1>
          <p class="text-muted mb-1">Categoria: ${receita.categoria}</p>
          <p class="text-muted mb-1">Autor: ${receita.autor}</p>
          <p class="text-muted mb-3">Publicado em: ${receita.data}</p>
          <img src="${receita.imagem}" class="img-capa" alt="${receita.titulo}">
          <p>${receita.conteudo}</p>
        </section>
        ${galeriaHTML}
      `;
    })
    .catch(err => {
      document.getElementById("detalhe-receita").innerHTML = "<p>Receita não encontrada.</p>";
      console.error(err);
    });
}

// Carrossel de Destaques
if (document.getElementById("carousel-inner-destaques")) {
  const carrosselContainer = document.getElementById("carousel-inner-destaques");

  fetch("http://localhost:3000/receitas")
    .then(res => res.json())
    .then(receitas => {
      let isFirst = true;
      receitas.filter(r => r.exibirnocarrossel).forEach(receita => {
        const item = document.createElement("div");
        item.className = `carousel-item${isFirst ? " active" : ""}`;
        item.innerHTML = `
          <img src="${receita.imagem}" class="d-block w-100" alt="${receita.titulo}">
          <div class="carousel-caption d-none d-md-block">
            <h2>${receita.titulo}</h2>
            <p>${receita.descricao}</p>
            <a href="detalhes.html?id=${receita.id}" class="btn btn-warning">Ver Receita</a>
          </div>
        `;
        carrosselContainer.appendChild(item);
        isFirst = false;
      });
    })
    .catch(err => console.error("Erro ao carregar carrossel:", err));
}

// Sugestão de Receita Sazonal (id 4)
if (document.getElementById("sugestao-sazonal")) {
  fetch("http://localhost:3000/receitas/4")
    .then(res => res.json())
    .then(receita => {
      document.getElementById("sugestao-sazonal").innerHTML = `
        <div class="row align-items-center">
          <div class="col-md-6 mb-3 mb-md-0 text-center">
            <img src="${receita.imagem}" alt="${receita.titulo}" class="img-fluid rounded" style="max-width: 300px;">
          </div>
          <div class="col-md-6">
            <h2>${receita.titulo}</h2>
            <p>${receita.descricao}</p>
            <a href="detalhes.html?id=${receita.id}" class="btn btn-warning">Saiba Mais</a>
          </div>
        </div>
      `;
    })
    .catch(err => console.error("Erro ao carregar sugestão sazonal:", err));
}

// Receita Popular de Festa (id 5)
if (document.getElementById("receitas-populares")) {
  fetch("http://localhost:3000/receitas/5")
    .then(res => res.json())
    .then(receita => {
      document.getElementById("receitas-populares").innerHTML = `
        <div class="row align-items-center flex-md-row-reverse">
          <div class="col-md-6 mb-3 mb-md-0 text-center">
            <img src="${receita.imagem}" alt="${receita.titulo}" class="img-fluid rounded" style="max-width: 300px;">
          </div>
          <div class="col-md-6">
            <h2>${receita.titulo}</h2>
            <p>${receita.descricao}</p>
            <a href="detalhes.html?id=${receita.id}" class="btn btn-warning">Ver Mais</a>
          </div>
        </div>
      `;
    })
    .catch(err => console.error("Erro ao carregar receita popular:", err));
}

// Exibir detalhes do artigo na página detalhes_artigo.html
if (document.getElementById("detalhe-artigo")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  fetch(`http://localhost:3000/artigos/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Artigo não encontrado");
      return res.json();
    })
    .then(artigo => {
      let galeriaHTML = "";

      if (artigo.imagens_galeria && artigo.imagens_galeria.length > 0) {
        galeriaHTML = `
          <section class="container my-5">
            <h2 class="mb-4">Mais Imagens</h2>
            <div class="row">
              ${artigo.imagens_galeria.map(imagem => `
                <div class="col-md-4 mb-3 d-flex flex-column align-items-center">
                  <img src="${imagem.src}" class="img-fluid rounded" alt="${imagem.descricao}" style="max-width: 300px; height: 220px; object-fit: cover;">
                  <p class="mt-2 text-center">${imagem.descricao}</p>
                </div>
              `).join('')}
            </div>
          </section>
        `;
      }

      document.getElementById("page-title").innerText = `${artigo.titulo} - Artigo`;
      document.getElementById("detalhe-artigo").innerHTML = `
        <section class="container my-5">
          <div class="artigo-conteudo mx-auto">
            <h1 class="mb-3">${artigo.titulo}</h1>
            <p class="text-muted mb-1">Autor: ${artigo.autor}</p>
            <p class="text-muted mb-3">Publicado em: ${artigo.data}</p>
            <img src="${artigo.imagem}" class="img-capa" alt="${artigo.titulo}">
            ${artigo.conteudo}
            ${galeriaHTML}
          </div>
        </section>
      `;
    })
    .catch(err => {
      document.getElementById("detalhe-artigo").innerHTML = "<p>Artigo não encontrado.</p>";
      console.error(err);
    });
}

// Exibir lista de artigos na Home
if (document.getElementById("lista-artigos")) {
  const container = document.getElementById("lista-artigos");

  fetch("http://localhost:3000/artigos")
    .then(res => res.json())
    .then(artigos => {
      artigos.forEach(artigo => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
          <div class="card h-100">
            <img src="${artigo.imagem}" class="card-img-top" alt="${artigo.titulo}">
            <div class="card-body text-center d-flex flex-column">
              <h5 class="card-title">${artigo.titulo}</h5>
              <p class="card-text">${artigo.descricao}</p>
              <a href="detalhes_artigo.html?id=${artigo.id}" class="btn btn-warning mt-auto">Ler Mais</a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Erro ao carregar artigos:", err));
}

  
  
