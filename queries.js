const { Client } = require("pg");
require("dotenv").config();

const queries = (text, values) => ({ text, values });

const getTodos = async () => {
  const sqlQuery = "SELECT * FROM todos";
  const client = new Client();
  await client.connect();
  const res = await client.query(sqlQuery);
  await client.end();
  return res.rows;
};

const createTodo = async (data) => {
  const sqlQuery =
    "INSERT INTO todos (name, description, todo_date) VALUES ($1, $2, $3) RETURNING*";
  const values = data;
  const client = new Client();
  await client.connect();
  const res = await client.query(queries(sqlQuery, values));
  await client.end();
  return res.rows;
};

const deleteTodo = async (id) => {
  const sqlQuery = "DELETE FROM todos WHERE id = $1 RETURNING*";
  const value = [id];
  const client = new Client();
  await client.connect();
  const res = await client.query(queries(sqlQuery, value));
  return res.rowCount;
};

const findTodo = async (id) => {
  const sqlQuery = "SELECT * FROM todos WHERE id = $1";
  const value = [id];
  const client = new Client();
  await client.connect();
  const res = await client.query(queries(sqlQuery, value));
  await client.end();
  return res.rows[0];
};

module.exports = { getTodos, createTodo, deleteTodo, findTodo };
