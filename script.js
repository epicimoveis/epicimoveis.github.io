let imoveis = [];
const lista = document.getElementById("lista-imoveis");
const detalhes = document.getElementById("detalhes");

// CARREGA O JSON
fetch("imoveis.json")
  .then(res => res.json())
  .then(data => {
    imoveis = data;
    carregarCidades();
    render();
  });

// POPULA CIDADES
function carregarCidades() {
  const cidades = [...new Set(imoveis.map(i => i.cidade))];
  const select = document.getElementById("cidade");

  cidades.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    select.appendChild(option);
  });
}

// RENDERIZA LISTA
function render() {
  lista.innerHTML = "";
  detalhes.classList.add("hidden");

  const tipo = document.getElementById("tipo").value;
  const cidade = document.getElementById("cidade").value;
  const preco = document.getElementById("preco").value;

  imoveis
    .filter(i =>
      (!tipo || i.tipo === tipo) &&
      (!cidade || i.cidade === cidade) &&
      (!preco || i.preco <= preco)
    )
    .forEach(i => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${i.foto}">
        <div>
          <h3>${i.titulo}</h3>
          <p>${i.cidade}</p>
          <p>${i.quartos} quartos</p>
          <strong>R$ ${i.preco.toLocaleString()}</strong>
          <button onclick="verDetalhes(${i.id})">Ver Detalhes</button>
        </div>
      `;
      lista.appendChild(card);
    });
}

// DETALHES
function verDetalhes(id) {
  const i = imoveis.find(im => im.id === id);
  detalhes.classList.remove("hidden");
  lista.innerHTML = "";

  detalhes.innerHTML = `
    <h2>${i.titulo}</h2>
    <img src="${i.foto}" style="max-width:400px">
    <p><strong>Cidade:</strong> ${i.cidade}</p>
    <p><strong>Tipo:</strong> ${i.tipo}</p>
    <p><strong>Quartos:</strong> ${i.quartos}</p>
    <p><strong>Preço:</strong> R$ ${i.preco.toLocaleString()}</p>
    <p>${i.descricao}</p>
    <br>
    <a href="https://wa.me/5567981600051" target="_blank">Falar no WhatsApp</a>
    <br><br>
    <button onclick="render()">Voltar</button>
  `;
}

// FILTROS EM TEMPO REAL
document.querySelectorAll("select").forEach(el =>
  el.addEventListener("change", render)
);
