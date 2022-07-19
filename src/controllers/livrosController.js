import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (_, res) => {
    livros
      .find()
      .populate("autor")
      .populate("editora")
      .exec((err, livros) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(200).json(livros);
        }
      });
  };

  static listarLivroPorEditora = (req, res) => {
    // A pesquisa deverá ser feita com base no ID da editora, e não mais pelo nome
    const editora = req.query.idEditora;
    livros
      .find({editora: editora})
      .populate("autor", "nome")
      // Desta forma os resultados que não obedecerem a condição ainda serão exibidos, mas com o valor null
      /*.populate({
        path: "editora",
        match: {nome: editora}
      })*/
      .populate("editora")
      .exec((err, livros) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(200).send(livros);
        }
      });
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;
    livros
      .findById(id)
      .populate("autor", "nome")
      .populate("editora")
      .exec((err, livros) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - Id do livro não localizado.` });
        } else {
          res.status(200).send(livros);
        }
      });
  };

  static cadastrarLivro = (req, res) => {
    const livro = new livros(req.body);
    livro.save((err) => {
      if (err) {
        res.status(500).send({
          message: `${err.message} - falha ao cadastrar livro.`,
        });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;
    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro atualizado com sucesso." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirLivro = (req, res) => {
    const id = req.params.id;
    livros.findOneAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro removido com sucesso." });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default LivroController;
