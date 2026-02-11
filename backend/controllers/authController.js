const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { data } = require("../services/dataStore");

const JWT_SECRET = process.env.JWT_SECRET || "esivayo-local-secret";

async function login(req, res) {
  const { email, password } = req.body;

  const user = data.users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "8h"
  });

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
}

module.exports = { login };
