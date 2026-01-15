const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = require("./database");
const User = require("./User");

const app = express();
app.use(express.json());

const JWT_SECRET = "sekretny_klucz_do_celi703";

sequelize.sync().then(() => {
  console.log("Users DB ready");
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.json({ id: user.id });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});



app.listen(3003, () => {
  console.log("Users service running on port 3003");
});
