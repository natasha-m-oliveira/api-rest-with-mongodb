import express from 'express';

const app = express();

app.use(express.json());

const livros = [
  {
    id: 1,
    titulo: 'Laravel',
  },
  {
    id: 2,
    titulo: 'Nodejs',
  },
  {
    id: 3,
    titulo: 'Java',
  },
];

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node');
});

app.get('/livros', (req, res) => {
  res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  res.status(200).json(livros[index]);
});

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).send('O livro cadastrado com sucesso');
});

app.put('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);

  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
});

app.delete('/livros/:id', (req, res) => {
  const { id } = req.params;
  const index = buscaLivro(id);
  livros.splice(index, 1);
  res.send(`Livro ${id} foi removido com sucesso.`);
});

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id == id);
}

export default app;
