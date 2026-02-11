const express = require("express");
const authRoutes = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", service: "esivayo-erp-backend" }));
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/export", exportRoutes);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`ESIVAYO ERP backend a correr na porta ${port}`);
  });
}

module.exports = { app };
