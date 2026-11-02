const express = require("express");
const path = require("node:path");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Homepage route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Message Board",
    messages: messages
  });
});

// New message page
app.get("/new", (req, res) => {
  res.render("form", {
    title: "New Message"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});