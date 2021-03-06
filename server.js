const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const api = require("./routes/api");
const front = require("./routes/front");

const port = process.env.PORT || 5000;
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api);
app.use(front);

app.listen(port, () => console.log(`Escuchando puerto ${port}`));
