const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const collection = "todo";
const app = express();
app.use(bodyParser.json());

db.connect((error) => {
  if (error) {
    console.log("unable to connected to database");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("connected to DB. listening on port 3000");
    })
  }
})

