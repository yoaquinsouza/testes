export default function handler(req, res) {
  const { slug } = req.query;
  const all = [...require('../../todos.json'), ...require('../../masculino.json'), ...require('../../feminino.json')];
  const produto = all.find(p => p.imagem.toLowerCase().includes(slug));
  if (!produto) return res.status(404).send('Produto não encontrado');

  const domain = `https://${req.headers.host}`;
  const html = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta property="og:title" content="${produto.modelo}">
<meta property="og:description" content="Tamanhos: ${produto.tamanhos}">
<meta property="og:image" content="https://testes-phi-five.vercel.app/${produto.imagem}">
<meta property="og:type" content="website">
<title>${produto.modelo}</title>
</head>
<body>
<img src="https://testes-phi-five.vercel.app/${produto.imagem}" alt="${produto.modelo}" 
style="max-width:90%;display:block;margin:20px auto;border-radius:8px;">

</body>
</html>`;
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}
