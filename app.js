// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initializing variable for express
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Page-displaying Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/notes.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// GET Routes
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File successfully read!");
    return res.end(data);
  });
});

// POST Routes
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  var savedNotes;
  // Get current data from db.json, and write to it with
  // The new data
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File successfully read!");
    // Initializes data if there is nothing there
    if (!data) {
      savedNotes = [];
    } else savedNotes = JSON.parse(data);
    savedNotes.push(newNote);
    // Adding id's to notes
    savedNotes.map((object, index) => {
      return Object.assign(object, { id: index + 1 });
    });
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), function (err) {
      if (err) throw err;
      console.log("Note successfully saved!");
      return res.json(newNote);
    });
  });
});
// DELETE Routes
app.delete("/api/notes/:id", function (req, res) {
  var id = parseInt(req.params.id);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    savedNotes = JSON.parse(data);
    // Deletes note with given ID
    savedNotes = savedNotes
      .filter((object) => {
        return object.id !== id;
      })
      .map((object, index) => {
        return Object.assign(object, { id: index + 1 });
      });
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), function (err) {
      if (err) throw err;
      console.log("Note successfully deleted!");
      res.end();
    });
  });
});

// Catch-all route
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Listening to port
app.listen(PORT, function () {
  console.log(
    `Listening on PORT ${PORT}. Your site is here: http://localhost:${PORT}`
  );
});
