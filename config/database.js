//trata da conexão entre o mongo utilizando o mongoose

const mongoose = require("mongoose");

let url = "mongodb://localhost:1111/booksDB";

const conexão = mongoose.createConnection(url);

module.exports = conexão;
