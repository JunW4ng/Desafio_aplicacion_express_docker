const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { engine } = require("express-handlebars");
const { getTodos, createTodo } = require("./queries");
const port = 3000;

const id = uuidv4();
const app = express();

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/components",
  })
);

//? Muestra todos
app.get("/", async (req, res) => {
  const todos = await getTodos();
  console.log(todos);
  res.render("Dashboard", { data: todos });
});

//? Crea un todo
app.post('/todo-create', async(req, res)=>{
  const {} = req.body
  const todo = await createTodo()
})

app.listen(port, () => console.log(`Escuchando puerto ${port}`));
