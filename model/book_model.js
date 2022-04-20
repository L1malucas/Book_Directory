const mongoose = require("mongoose");
const banco = require("../config/database");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "----",
  },
  isbn: {
    type: Number,
  },
  author: {
    type: String,
    default: "----",
  },
});

const bookModel = banco.model("books", bookSchema);

module.exports = bookModel;
