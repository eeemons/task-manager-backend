const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "task-manager-app",
  password: "12345",
  port: 5432,
});
client.connect();

const getAllUsers = () => {
  client.query("SELECT * FROM users", (err, res) => {
    if (res) {
      console.log(res.rows);
      return res.rows;
    } else {
      console.log(err);
      return err;
    }
  });
};

module.exports = {
  getAllUsers,
};
