// ===============================
// CADASTRO DE IMÓVEIS
// Para adicionar imóveis, edite apenas este array
// ===============================

const imoveis = [
  {
    titulo: "Casa Moderna",
    preco: "R$ 750.000",
    localizacao: "São Paulo - SP",
    tipo: "casa",
    foto: "eco 1.png"
  },
  {
    titulo: "Apartamento Central",
    preco: "R$ 450.000",
    localizacao: "Campinas - SP",
    tipo: "apartamento",
    foto: "https://via.placeholder.com/400x300"
  }
];

// ===============================
// RENDERIZA IMÓVEIS
// ===============================

const lista = document.getElementById("lista-imoveis");

function renderImoveis(filtro = "") {
  lista.innerHTML = "";

  imoveis
    .filter(i => i.localizacao.toLowerCase().includes(filtro) || i.tipo.toLowerCase().includes(filtro))
    .forEach(imovel => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${imovel.foto}">
        <div>
          <h3>${imovel.titulo}</h3>
          <p>${imovel.localizacao}</p>
          <strong>${imovel.preco}</strong>
          <br><br>
          <a class="cta" href="https://wa.me/5567981600051" target="_blank">Ver detalhes</a>
        </div>
      `;

      lista.appendChild(card);
    });
}

renderImoveis();

// ===============================
// FILTRO
// ===============================
document.getElementById("filtro").addEventListener("input", e => {
  renderImoveis(e.target.value.toLowerCase());
});
