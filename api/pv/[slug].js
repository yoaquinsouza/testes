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
<meta property="og:image" content=${DOMAIN}${produto.imagem}>
<meta property="og:type" content="website">

<title>${produto.modelo}</title>

<style>
  body { font-family: Arial, sans-serif; text-align: center; padding: 25px; }
  img { width: 100%; max-width: 320px; border-radius: 10px; display: block; margin: auto; }
</style>

</head>
<body>

<h2>${produto.modelo}</h2>
<p>Tamanhos: ${produto.tamanhos}</p>
<img src="${DOMAIN}${produto.imagem}" alt="${produto.modelo}"/>

</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);

  } catch (err) {
    res.status(500).send(`<h2>Erro interno na rota</h2><pre>${err}</pre>`);
  }
}
