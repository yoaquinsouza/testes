export default function handler(req, res) {
  try {
    const { slug } = req.query;

    const all = [
      ...require('../../todos.json'),
      ...require('../../masculino.json'),
      ...require('../../feminino.json')
    ];

    const produto = all.find(p => p.imagem.toLowerCase().includes(slug));

    if (!produto) {
      return res.status(200).send(`<h2>Produto não encontrado</h2><p>Slug: ${slug}</p>`);
    }

    const DOMAIN = "https://testes-phi-five.vercel.app";

   

    const html = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">

<meta property="og:title" content="${produto.modelo}">
<meta property="og:description" content="Tamanhos: ${produto.tamanhos}">
<meta property="og:image" content="${DOMAIN}${produto.imagem}">
<meta property="og:type" content="website">

<title>${produto.modelo}</title>

<style>

  background: #000; /* mesmo fundo do site */
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.preview-container {
  background: #fff;                /* mesmo fundo do card */
  padding: 12px;                   /* mesmo padding do card */
  border-radius: 15px;             /* mesmo arredondamento */
  box-shadow: 0px 0px 10px rgba(0,0,0,0.15); /* mesma sombra */
  max-width: 450px;                /* versão maior que o card */
  width: 90%;
}

.preview-container img {
  width: 100%;
  border-radius: 12px;             /* mesmo radius da imagem no card */
  object-fit: cover;
  aspect-ratio: 1/1;               /* mantém proporção quadrada igual aos cards */
  display: block;


</style>

</head>
<body>
<div class="preview-container">
 <h2>${produto.modelo}</h2>
 <p>Tamanhos: ${produto.tamanhos}</p>
 <img src="${DOMAIN}${produto.imagem}" alt="${produto.modelo}"/>
</div>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);

  } catch (err) {
    res.status(500).send(`<h2>Erro interno na rota</h2><pre>${err}</pre>`);
  }
}
