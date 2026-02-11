const express = require("express");
const {
  listInvoices,
  createInvoice,
  updateInvoice
} = require("../controllers/invoiceController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, listInvoices);
router.post("/", requireAuth, createInvoice);
router.put("/:id", requireAuth, updateInvoice);

module.exports = router;
