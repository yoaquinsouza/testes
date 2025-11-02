const numeroWhatsApp = '91984494433';

document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos('todos');
});

function carregarProdutos(categoria) {
  let arquivo;
  if (categoria === 'todos') arquivo = 'todos.json';
  else if (categoria === 'masculino') arquivo = 'masculino.json';
  else if (categoria === 'feminino') arquivo = 'feminino.json';
  else arquivo = 'todos.json';

  fetch(arquivo)
    .then(r => r.json())
    .then(dados => renderizarProdutos(dados))
    .catch(err => console.error('Erro ao carregar produtos:', err));
}

function slugFromImage(imgPath) {
  const name = imgPath.split('/').pop();
  return name.split('.').slice(0, -1).join('.').replace(/[^a-z0-9-_]/gi, '').toLowerCase();
}

function renderizarProdutos(lista) {
  const conteiner = document.getElementById('produtos-conteiner');
  conteiner.innerHTML = '';

  lista.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = p.imagem;
    img.alt = p.modelo;
    img.loading = 'lazy';

    const nome = document.createElement('h3');
    nome.textContent = p.modelo;

    const tamanhos = document.createElement('p');
    tamanhos.textContent = `Tamanhos: ${p.tamanhos}`;

    const botao = document.createElement('button');
    botao.className = 'botao-comprar';
    botao.textContent = 'Comprar';
    botao.addEventListener('click', () => {
      // Cria o link da página de preview
      const slug = slugFromImage(p.imagem);
      const urlPreview = `${window.location.origin}/pv/${slug}.html`;

      const mensagem = encodeURIComponent(
        `Olá! Quero comprar o ${p.modelo} (Tamanhos: ${p.tamanhos}). %0A%0A🖼 Prévia do produto: ${urlPreview}`
      );

      const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
      window.open(url, '_blank');
    });

    card.append(img, nome, tamanhos, botao);
    conteiner.appendChild(card);
  });
}

// Troca de categoria
document.addEventListener('click', e => {
  if (e.target.classList.contains('filtro')) {
    document.querySelectorAll('.filtro').forEach(f => f.classList.remove('ativo'));
    e.target.classList.add('ativo');

    const categoria = e.target.dataset.categoria;
    carregarProdutos(categoria);
  }
});

// Ampliar imagem
document.addEventListener('click', e => {
  const alvo = e.target;
  if (alvo.matches('.card img')) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const imgGrande = document.createElement('img');
    imgGrande.src = alvo.src;
    imgGrande.alt = alvo.alt || '';
    imgGrande.className = 'imagem-ampliada';

    overlay.appendChild(imgGrande);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => overlay.remove());
  }
});
