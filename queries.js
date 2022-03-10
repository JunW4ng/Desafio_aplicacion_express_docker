require("dotenv").config();
const { Client } = require("pg");

const getTodos = async () => {
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT * from todos");
  await client.end();
  return res.rows;
};

module.exports = getTodos;
