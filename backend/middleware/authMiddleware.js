const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "esivayo-local-secret";

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Token ausente" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = { requireAuth };
