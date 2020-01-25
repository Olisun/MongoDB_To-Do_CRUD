const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const collection = "todo";
const app = express();
app.use(bodyParser.json());


// For serving the static HTML file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getTodos", (req, res) => {
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((error, documents) => {
      if (error) {
        console.log("error in app.get");
      } else {
        console.log("documents");
        res.json(documents);
      }
    });
});

app.put("/:id", (req, res) => {
  const todoID = req.params.id;
  const userInput = req.body;
  db.getDB()
    .collection(collection)
    .findOneAndUpdate(
      {
        _id: db.getPrimaryKey(todoID)
      },
      {
        $set: {
          todo: userInput.todo,
          todo2: userInput.todo2
        }
      },
      {
        returnOriginal: false
      },
      (error, result) => {
        if (error) {
          console.log("error in app.put");
        } else {
          res.json(result);
        }
      }
    );
});

app.post("/", (req, res) => {
  const userInput = req.body;
  db.getDB()
    .collection(collection)
    .insertOne(userInput, (error, result) => {
      if (error) {
        console.log("error in app.post");
      } else {
        res.json(
          {
            result: result,
            document: result.ops[0]
          }
        )
      }
    });
});

app.delete("/:id", (req, res) => {
  const todoID = req.params.id;
  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (error, result) => {
      if (error) {
        console.log("error in app.delete");
      } else {
        res.json(result);
      }
    });
});

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

