// Dependencies
var express = require("express");
var path = require("path");

// Initializing variable for express
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../../index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

// Listening to port
app.listen(PORT, function() {
  console.log(
    `Listening on PORT ${PORT}. Your site is here: http://localhost:${PORT}`
  );
});
