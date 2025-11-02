export default function handler(req, res) {
  const { slug } = req.query;
  const all = [
    ...require('../../todos.json'),
    ...require('../../masculino.json'),
    ...require('../../feminino.json')
  ];

  const produto = all.find(p => p.imagem.toLowerCase().includes(slug));
  if (!produto) return res.status(404).send('Produto não encontrado');

  const DOMAIN = "https://testes-phi-five.vercel.app";

  const html = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">

<meta property="og:title" content="${produto.modelo}">
<meta property="og:description" content="Tamanhos: ${produto.tamanhos}">
<meta property="og:image" content= "https://testes-phi-five.vercel.app${produto.imagem}">
<meta property="og:type" content="website">

<title>${produto.modelo}</title>

<style>
  body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 25px;
    background: #ffffff;
  }
  .imgProduto {
    width: 100%;
    max-width: 300px;   /* mesmo do card */
    border-radius: 10px; /* mesmo do card */
    display: block;
    margin: auto;
  }
  h2 {
    font-size: 22px;
    margin-bottom: 8px;
  }
  p {
    font-size: 16px;
    color: #444;
  }
</style>

</head>
<body>

<h2>${produto.modelo}</h2>
<p>Tamanhos: ${produto.tamanhos}</p>
<img class="imgProduto" src="https://testes-phi-five.vercel.app${produto.imagem}" alt="${produto.modelo}"/>

</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}
