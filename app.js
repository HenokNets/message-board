const express = require("express");
const path = require("node:path");

const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));

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

// Handle form submission

app.post("/new", (req, res) => {

  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date()
  });

  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const messageId = Number(req.params.id);

  const message = messages[messageId];

  if (!Number.isInteger(messageId) || !message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", {
    title: "Message Details",
    message: message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});