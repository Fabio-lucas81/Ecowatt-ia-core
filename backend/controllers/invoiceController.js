const { calculateInvoiceTotals } = require("../services/taxService");
const { generateInvoiceHash } = require("../utils/hashUtil");
const { data } = require("../services/dataStore");

function listInvoices(req, res) {
  return res.json(data.invoices);
}

function createInvoice(req, res) {
  const {
    issueDate,
    customerId,
    regimeIva,
    withholdingRatePct = 0,
    lines
  } = req.body;

  if (!issueDate || !customerId || !regimeIva || !Array.isArray(lines) || lines.length === 0) {
    return res.status(400).json({ message: "Dados da factura incompletos" });
  }

  const invoiceNumber = `FT ${new Date().getFullYear()}/${String(data.invoices.length + 1).padStart(6, "0")}`;
  const taxCalc = calculateInvoiceTotals(lines, regimeIva, withholdingRatePct);

  const previousHash = data.invoices.length ? data.invoices[data.invoices.length - 1].hash : "";
  const hash = generateInvoiceHash(
    {
      invoiceNumber,
      issueDate,
      customerNif: String(customerId),
      totalGross: taxCalc.totals.grossTotal
    },
    previousHash
  );

  const invoice = {
    id: data.invoices.length + 1,
    invoiceNumber,
    issueDate,
    customerId,
    regimeIva,
    status: "EMITIDA",
    hash,
    software: {
      name: "ESIVAYO ERP",
      version: "0.1.0"
    },
    lines: taxCalc.lines,
    totals: taxCalc.totals
  };

  data.invoices.push(invoice);
  return res.status(201).json(invoice);
}

function updateInvoice(req, res) {
  const invoiceId = Number(req.params.id);
  const invoice = data.invoices.find((item) => item.id === invoiceId);

  if (!invoice) {
    return res.status(404).json({ message: "Factura não encontrada" });
  }

  const { status } = req.body;
  if (status) {
    invoice.status = status;
  }

  return res.json(invoice);
}

module.exports = { listInvoices, createInvoice, updateInvoice };
