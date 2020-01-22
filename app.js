const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const collection = "todo";
const app = express();
app.use(bodyParser.json());

// For serving the static HTML file.
app.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "index.html"));
});

app.get("/getTodos", (req, res) => {
  db.getDB().collection(collection).find({}).toArray((error, documents) => {
    if (error) {
      console.log("error");
    } else {
      console.log("documents");
      res.json(documents);
    }
  })
})

// For the server. 
db.connectToMongo((error) => {
  if (error) {
    console.log("unable to connected to database");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("connected to DB. listening on port 3000");
    })
  }
})

