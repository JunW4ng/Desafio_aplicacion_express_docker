const express = require("express");
const { engine } = require("express-handlebars");
const { getTodos } = require("./queries");
const port = 3000;

const app = express();

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/components",
  })
);

const dataJson = require("./borrar.json");

app.get("/", async (req, res) => {
  const todos = await getTodos();
  res.render("Dashboard", { data: todos });
});

app.listen(port, () => console.log(`Escuchando puerto ${port}`));
