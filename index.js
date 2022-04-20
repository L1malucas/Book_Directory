const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/api");

const app = express();
const port = 1111;

app.use(bodyParser.json());
app.use("/", api);

app.listen(port, () => console.log(`àpp listening on port ${port}`));
