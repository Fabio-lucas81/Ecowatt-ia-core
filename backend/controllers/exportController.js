const { data } = require("../services/dataStore");
const { buildSAFT } = require("../services/saftService");

function exportSaft(req, res) {
  const company = {
    name: "ESIVAYO ERP, LDA",
    nif: "5009998881",
    softwareName: "ESIVAYO ERP",
    softwareVersion: "0.1.0",
    softwareNif: "5009998881",
    softwareCertificate: "EM_VALIDACAO"
  };

  const { startDate, endDate } = req.query;

  const filteredInvoices = data.invoices.filter((invoice) => {
    if (!startDate && !endDate) return true;
    const current = new Date(invoice.issueDate).getTime();
    const from = startDate ? new Date(startDate).getTime() : Number.NEGATIVE_INFINITY;
    const to = endDate ? new Date(endDate).getTime() : Number.POSITIVE_INFINITY;
    return current >= from && current <= to;
  });

  const saftXml = buildSAFT({
    company,
    customers: data.customers,
    invoices: filteredInvoices
  });

  res.set("Content-Type", "application/xml");
  return res.send(saftXml);
}

module.exports = { exportSaft };
