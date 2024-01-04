const express = require("express");
const { get } = require("http");
const sqlite3 = require("sqlite3").verbose();

/* Server objekt  */

const server = express();


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

/* Databas objekt */
const database = new sqlite3.Database("./netflix.db")

/*get funktion */
server.get("", (req, res) => {
  database.all("SELECT * FROM movie", (err, rows) => {
    if (err) {
      console.log(err); // Lägg till denna rad
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});


server.put("/:id", (req, res) => {
  const id = req.params.id;
  const movie = req.body;
  database.run(
    `UPDATE movies SET title=?, length=?, short_description=?, long_description=? WHERE id=?`,
    [movie.title, movie.length, movie.short_description, movie.long_description, id],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "Film uppdaterad" });
      }
    }
    );
  });
  
  server.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    database.run(`DELETE FROM movie WHERE id = ?`, id, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send("Film borttagen");
      }
    });
  });

  server.post("", (req, res) => {
    const movie = req.body;
    database.run(
      `INSERT INTO movie (title, length, short_description, long_description) VALUES (?, ?, ?, ?)`,
      [movie.title, movie.length, movie.short_description, movie.long_descriptio],
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err });
        } else {
          res.status(201).json({ message: "Film skapad" });
        }
      }
    );
  });