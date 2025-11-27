const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const productosRouter = require('./routes/productos');

const app = express();
app.use(express.json());
const db = new sqlite3.Database('./database.sqlite');

app.use('/api/productos', productosRouter);

const port = 3000;

app.get('/', (req, res) => {
  //res.send('Hello World!');
  db.serialize(() => {
    db.all('SELECT * FROM productos', [], (err, rows) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      res.json(rows);
    });
  });
});

app.listen(port, () => {
  console.log(`Server app is running at http://localhost:${port}`);
});