const xmlbuilder = require("xmlbuilder");

function buildSAFT({ company, customers, invoices }) {
  const xml = xmlbuilder.create("SAFT", { encoding: "UTF-8" });

  const header = xml.ele("Header");
  header.ele("AuditFileVersion", "1.0");
  header.ele("CompanyName", company.name);
  header.ele("CompanyTaxID", company.nif);
  header.ele("TaxAccountingBasis", "F");
  header.ele("CurrencyCode", "AOA");
  header.ele("SoftwareCertificateNumber", company.softwareCertificate);
  header.ele("ProductCompanyTaxID", company.softwareNif);
  header.ele("ProductID", company.softwareName);
  header.ele("ProductVersion", company.softwareVersion);

  const masterFiles = xml.ele("MasterFiles");
  customers.forEach((customer) => {
    const node = masterFiles.ele("Customer");
    node.ele("CustomerID", customer.id);
    node.ele("AccountID", customer.nif);
    node.ele("CustomerTaxID", customer.nif);
    node.ele("CompanyName", customer.name);
    node.ele("BillingAddress").ele("AddressDetail", customer.address || "N/D");
  });

  const sourceDocuments = xml.ele("SourceDocuments");
  const salesInvoices = sourceDocuments.ele("SalesInvoices");
  salesInvoices.ele("NumberOfEntries", invoices.length);

  const totalDebit = invoices.reduce((sum, inv) => sum + inv.totals.grossTotal, 0);
  const totalCredit = invoices.reduce((sum, inv) => sum + inv.totals.netPayable, 0);
  salesInvoices.ele("TotalDebit", totalDebit.toFixed(2));
  salesInvoices.ele("TotalCredit", totalCredit.toFixed(2));

  invoices.forEach((invoice) => {
    const invoiceNode = salesInvoices.ele("Invoice");
    invoiceNode.ele("InvoiceNo", invoice.invoiceNumber);
    invoiceNode.ele("InvoiceDate", invoice.issueDate);
    invoiceNode.ele("CustomerID", invoice.customerId);
    invoiceNode.ele("Hash", invoice.hash);
    invoiceNode.ele("HashControl", "1");

    invoice.lines.forEach((line, idx) => {
      const lineNode = invoiceNode.ele("Line");
      lineNode.ele("LineNumber", idx + 1);
      lineNode.ele("ProductCode", line.productId);
      lineNode.ele("ProductDescription", line.description);
      lineNode.ele("Quantity", line.qty);
      lineNode.ele("UnitPrice", line.unitPrice.toFixed(2));
      lineNode.ele("TaxPointDate", invoice.issueDate);
      lineNode.ele("CreditAmount", line.lineGross.toFixed(2));

      const tax = lineNode.ele("Tax");
      tax.ele("TaxType", "IVA");
      tax.ele("TaxCountryRegion", "AO");
      tax.ele("TaxCode", line.vatRate > 0 ? "NOR" : "ISE");
      tax.ele("TaxPercentage", line.vatRate.toFixed(2));

      if (line.withholdingRatePct > 0) {
        const withholding = lineNode.ele("WithholdingTax");
        withholding.ele("WithholdingTaxType", "RET");
        withholding.ele("WithholdingTaxDescription", "Retenção na Fonte");
        withholding.ele("WithholdingTaxAmount", line.withholdingAmount.toFixed(2));
      }
    });

    const totals = invoiceNode.ele("DocumentTotals");
    totals.ele("TaxPayable", invoice.totals.vatAmount.toFixed(2));
    totals.ele("NetTotal", invoice.totals.taxableBase.toFixed(2));
    totals.ele("GrossTotal", invoice.totals.grossTotal.toFixed(2));
  });

  return xml.end({ pretty: true });
}

module.exports = { buildSAFT };
