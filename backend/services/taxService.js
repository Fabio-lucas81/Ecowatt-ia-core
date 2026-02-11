const { TAX_REGIMES } = require("../config/taxRegimes");

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function calculateLineTaxes(line, regimeCode, withholdingRatePct = 0) {
  const regime = TAX_REGIMES[regimeCode];

  if (!regime) {
    throw new Error(`Regime IVA inválido: ${regimeCode}`);
  }

  const taxableBase = round2(line.qty * line.unitPrice);
  const vatRate = regime.requiresVat ? (line.taxRate || 0) : 0;
  const vatAmount = round2(taxableBase * (vatRate / 100));

  const withholdingAmount = round2(taxableBase * (withholdingRatePct / 100));
  const lineGross = round2(taxableBase + vatAmount);
  const lineNetPayable = round2(lineGross - withholdingAmount);

  return {
    taxableBase,
    vatRate,
    vatAmount,
    withholdingRatePct,
    withholdingAmount,
    lineGross,
    lineNetPayable
  };
}

function calculateInvoiceTotals(lines, regimeCode, withholdingRatePct = 0) {
  const calculatedLines = lines.map((line) => ({
    ...line,
    ...calculateLineTaxes(line, regimeCode, withholdingRatePct)
  }));

  const totals = calculatedLines.reduce(
    (acc, line) => {
      acc.taxableBase += line.taxableBase;
      acc.vatAmount += line.vatAmount;
      acc.withholdingAmount += line.withholdingAmount;
      acc.grossTotal += line.lineGross;
      acc.netPayable += line.lineNetPayable;
      return acc;
    },
    {
      taxableBase: 0,
      vatAmount: 0,
      withholdingAmount: 0,
      grossTotal: 0,
      netPayable: 0
    }
  );

  return {
    lines: calculatedLines,
    totals: Object.fromEntries(
      Object.entries(totals).map(([key, value]) => [key, round2(value)])
    )
  };
}

module.exports = { calculateLineTaxes, calculateInvoiceTotals };
