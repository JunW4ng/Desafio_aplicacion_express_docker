const { Router } = require("express");
const router = Router();

const { getTodos, createTodo, deleteTodo } = require("../queries");

router.get("/todos", (req, res) => {
  getTodos()
    .then((todos) => res.json(todos))
    .catch((error) => res.json(error));
});

router.post("/todos", (req, res) => {
  createTodo(req.body)
    .then(() => req.json({ message: "creado" }))
    .catch((error) => res.json({ error }));
});

router.delete("todos/:id", (req, res) => {
  const { id } = req.params;
  deleteTodo(id)
    .then(() => res.json({ message: "eliminado" }))
    .catch((error) => res.json({ error }));
});

module.exports = router;
