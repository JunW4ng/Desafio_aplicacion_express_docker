const moment = require("moment");
const { Router } = require("express");
const { getTodos, createTodo, deleteTodo, findTodo } = require("../queries");

const router = Router();
const date = moment().format();

//? Muestra todos
router.get("/", async (req, res) => {
  const todos = await getTodos();
  res.render("todoList", { data: todos });
});

router.get("/todo-create", (req, res) => {
  res.render("createTodo");
});

//? Crea un todo
router.post("/todo-create", async (req, res) => {
  const { name, description } = req.body;
  const data = [name, description, date];
  await createTodo(data);
  res.redirect("/");
});

//? Confirmacion de eliminacion
router.get("/todo-delete/:id", async (req, res) => {
  const { id } = req.params;
  const { deleteNow } = req.query;
  try {
    if (deleteNow) {
      await deleteTodo(id).then(() => res.redirect("/"));
    } else {
      res.render("deleteConfirmation", { todo: await findTodo(id) });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
