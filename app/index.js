const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect();

app.get('/', (req, res) => {
  const name = `Fulano ${Date.now()}`;
  const insertQuery = `INSERT INTO people(name) values('${name}')`;

  connection.query(insertQuery, (err) => {
    if (err) throw err;

    connection.query('SELECT * FROM people', (err, results) => {
      if (err) throw err;

      const namesList = results.map(person => `<li>${person.name}</li>`).join('');
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
