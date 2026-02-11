const test = require("node:test");
const assert = require("node:assert/strict");
const { buildSAFT } = require("../services/saftService");

test("buildSAFT gera XML com estrutura principal", () => {
  const xml = buildSAFT({
    company: {
      name: "ESIVAYO ERP, LDA",
      nif: "5009998881",
      softwareName: "ESIVAYO ERP",
      softwareVersion: "0.1.0",
      softwareNif: "5009998881",
      softwareCertificate: "CERT"
    },
    customers: [{ id: 1, name: "Cliente", nif: "500000001", address: "Luanda" }],
    invoices: [
      {
        invoiceNumber: "FT 2026/000001",
        issueDate: "2026-01-01",
        customerId: 1,
        hash: "abc123",
        lines: [
          {
            productId: 1,
            description: "Item",
            qty: 1,
            unitPrice: 100,
            vatRate: 14,
            withholdingRatePct: 6.5,
            withholdingAmount: 6.5,
            lineGross: 114
          }
        ],
        totals: {
          grossTotal: 114,
          netPayable: 107.5,
          vatAmount: 14,
          taxableBase: 100
        }
      }
    ]
  });

  assert.match(xml, /<SAFT>/);
  assert.match(xml, /<SalesInvoices>/);
  assert.match(xml, /<WithholdingTax>/);
});
