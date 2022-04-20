const router = require("express").Router();
const { is } = require("express/lib/request");
const bookModel = require("../model/book_model");

router.get("/books", async (requisicao, resposta) => {
  const bookList = await bookModel.find();
  console.log(bookList);
  resposta.send(bookList);
});

router.get("/books/:id", async (requisicao, resposta) => {
  const { id } = requisicao.params;
  const book = await bookModel.findOne({ isbn: id });

  if (!book) {
    return resposta.send("Book not found");
  } else {
    resposta.send(book);
  }
});

router.post("/books", async (requisicao, resposta) => {
  const title = requisicao.body.title;
  const isbn = requisicao.body.isbn;
  const author = requisicao.body.author;
  const bookExist = await bookModel.findOne({ isbn: isbn });

  if (bookExist) {
    return resposta.send("book already exist");
    let data = await bookModel.create({ title, isbn, author });
    data.save();
    resposta.send("book uploaded");
  }
});

router.put("/books/:id", async (requisicao, resposta) => {
  const { id } = requisicao.params;
  const { title, authors } = requisicao.body;

  const bookExist = await bookModel.findOne({ isbn: id });

  if (!bookExist) {
    return resposta.send("book do not exist");
  }
  const updateField = (val, prev) => (!val ? prev : val);

  const updatedBook = {
    ...bookExist,
    title: updateField(title, bookExist.title),
    authors: updateField(authors, bookExist.author),
  };
  await bookModel.updateOne(
    { isbn: id },
    { $set: { title: updatedBook.title, author: updatedBook.authors } }
  );
  resposta.status(200).send("book updated");
});

router.delete("/books/:id", async (requisicao, resposta) => {
  const { id } = requisicao.params;

  const bookExist = await bookModel.findOne({ isbn: id });

  if (!bookExist) {
    return resposta.send("book do not exist");
  }

  await bookModel
    .deleteOne({ isbn: id })
    .then((result) => {
      console.log("data deleted");
      resposta.send("book record deleted");
    })
    .catch((err) => {});
});

module.exports = router;
