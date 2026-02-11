const express = require("express");
const { exportSaft } = require("../controllers/exportController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/saft", requireAuth, exportSaft);

module.exports = router;
