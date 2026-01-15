const express = require("express");
const sequelize = require("./database");
const Book = require("./Book");

const app = express();
app.use(express.json());

sequelize.sync().then(() => {
  console.log("Database ready");
});

const jwt = require("jsonwebtoken");
const JWT_SECRET = "sekretny_klucz_do_celi703";

function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

function onlyAdmin(req, res, next) {
  if (req.user.userId !== 1) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

app.get("/api/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.get("/api/books/:bookId", async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

app.post("/api/books", auth, onlyAdmin, async (req, res) => {
  const { title, author, year } = req.body;
  const book = await Book.create({ title, author, year });
  res.json({ id: book.id });
});

app.delete("/api/books/:bookId", auth, onlyAdmin, async (req, res) => {
  const deleted = await Book.destroy({
    where: { id: req.params.bookId },
  });

  if (!deleted) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json({ message: "Book deleted successfully" });
});

app.listen(3001, () => {
  console.log("Books service running on port 3001");
});
