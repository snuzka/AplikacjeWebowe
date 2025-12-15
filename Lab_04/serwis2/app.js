const express = require("express");
const sequelize = require("./database");
const Order = require("./Order");

const app = express();
app.use(express.json());

sequelize.sync().then(() => {
  console.log("Orders DB ready");
});

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

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

function onlyOwnerOrAdmin(paramName) {
  return (req, res, next) => {
    const userIdFromToken = req.user.userId;
    const userIdFromRequest = parseInt(req.params[paramName]);

    if (userIdFromToken === 1) {
      return next();
    }

    if (userIdFromToken === userIdFromRequest) {
      return next();
    }

    return res.status(403).json({ error: "Forbidden" });
  };
}

app.get(
  "/api/orders/:userId",
  auth,
  onlyOwnerOrAdmin("userId"),
  async (req, res) => {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
    });
    res.json(orders);
  }
);

app.post("/api/orders", auth, async (req, res) => {
  const { bookId, quantity } = req.body;

  const userId = req.user.userId;

  const response = await fetch(`http://localhost:3001/api/books/${bookId}`);

  if (!response.ok) {
    return res.status(400).json({ error: "Book does not exist" });
  }

  const order = await Order.create({
    userId,
    bookId,
    quantity,
  });

  res.json({ id: order.id });
});

async function onlyOrderOwnerOrAdmin(req, res, next) {
  const order = await Order.findByPk(req.params.orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (req.user.userId === 1) {
    return next();
  }

  if (order.userId === req.user.userId) {
    return next();
  }

  return res.status(403).json({ error: "Forbidden" });
}

app.delete(
  "/api/orders/:orderId",
  auth,
  onlyOrderOwnerOrAdmin,
  async (req, res) => {
    await Order.destroy({ where: { id: req.params.orderId } });
    res.json({ message: "Order deleted" });
  }
);

app.patch(
  "/api/orders/:orderId",
  auth,
  onlyOrderOwnerOrAdmin,
  async (req, res) => {
    const order = await Order.findByPk(req.params.orderId);

    if (req.body.quantity !== undefined) {
      order.quantity = req.body.quantity;
    }

    await order.save();
    res.json(order);
  }
);

app.listen(3002, () => {
  console.log("Orders service running on port 3002");
});
