const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateInvoiceTotals } = require("../services/taxService");

test("calculateInvoiceTotals aplica IVA e retenção", () => {
  const lines = [
    { productId: 1, description: "Serviço", qty: 2, unitPrice: 1000, taxRate: 14 }
  ];

  const result = calculateInvoiceTotals(lines, "GERAL", 6.5);

  assert.equal(result.totals.taxableBase, 2000);
  assert.equal(result.totals.vatAmount, 280);
  assert.equal(result.totals.withholdingAmount, 130);
  assert.equal(result.totals.grossTotal, 2280);
  assert.equal(result.totals.netPayable, 2150);
});
