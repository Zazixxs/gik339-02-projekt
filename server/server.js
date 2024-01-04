const express = require("express");

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
sqlite3 = require("sqlite3").verbose();


