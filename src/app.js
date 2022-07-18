import express from 'express';

const app = express();

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

export default app;
