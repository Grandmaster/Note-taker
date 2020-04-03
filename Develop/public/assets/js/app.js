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
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../../index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

// GET Routes
app.get("/api/notes", function(req, res) {
  fs.readFile("./../../../db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File successfully read!");
    return res.end(data);
  });
});

// POST Routes
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  var savedNotes;
  console.log(newNote);
  // Get current data from db.json
  fs.readFile("./../../../db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File successfully read!");
    savedNotes = JSON.parse(data);
    savedNotes.push(newNote);
    fs.writeFile("./../../../db/db.json", JSON.stringify(savedNotes), function(
      err
    ) {
      if (err) throw err;
      console.log("Note successfully saved!");
      return res.json(newNote);
    });
  });
});

// Listening to port
app.listen(PORT, function() {
  console.log(
    `Listening on PORT ${PORT}. Your site is here: http://localhost:${PORT}`
  );
});
