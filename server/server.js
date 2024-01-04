const express = require("express");

/* Server objekt  */

const server = express();
const database = require("./netflix.db");

/* Server inställningar */

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

/* Starta Webbservern */

server.listen(3000, () => {
  console.log("Servern körs på port 3000");
});
sqlite3 = require("sqlite3").verbose();

server.get("/movies", (req, res) => {
  database.all("SELECT * FROM movies", (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(rows);
    }
  });
});

server.put("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = req.body;
  database.run(
    `UPDATE movies SET title=?, director=?, year=?, rating=? WHERE id=?`,
    [movie.title, movie.director, movie.year, movie.rating, id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "Movie updated" });
      }
    }
  );
});
