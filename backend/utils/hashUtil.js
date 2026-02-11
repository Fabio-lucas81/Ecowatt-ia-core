const crypto = require("crypto");

function generateInvoiceHash(invoicePayload, previousHash = "") {
  const base = `${invoicePayload.invoiceNumber}|${invoicePayload.issueDate}|${invoicePayload.customerNif}|${invoicePayload.totalGross}|${previousHash}`;
  return crypto.createHash("sha256").update(base).digest("hex");
}

module.exports = { generateInvoiceHash };
