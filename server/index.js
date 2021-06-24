const express = require("express");
const db = require("./db/config");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/api/items", (req, res) => {
  db.query("SELECT * FROM items", (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.json([data.rows]);
    }
  });
});

app.get("/api/items/:id", (req, res) => {
  console.log(req)
  db.query("SELECT * FROM items WHERE id=$1;", [req.params.id], (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.json([data.rows]);
    }
  });
});

app.listen(4000, () => {
  console.log("listening on Port 4000");
});
