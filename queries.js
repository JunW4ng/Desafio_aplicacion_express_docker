const { Client } = require("pg");
require("dotenv").config();

const queries = (text, values) => ({ text, values });

const getTodos = async () => {
  const sqlQuery = "SELECT * from todos";
  const client = new Client();
  await client.connect();
  const res = await client.query(sqlQuery);
  await client.end();
  return res.rows;
};

const createTodo = async (data) => {
  const sqlQuery =
    "INSERT INTO todos (id, name, description, date) VALUES ($1, $2, $3, $4) RETURNING*";
  const values = data;
  const client = new Client();
  await client.connect();
  const res = await client.query(sqlQuery, values);
  await client.end();
  return res.rows;
};

module.exports = { getTodos, createTodo };
