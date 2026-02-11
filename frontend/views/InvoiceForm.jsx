import React, { useMemo, useState } from "react";

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export default function InvoiceForm({ customers = [], products = [], withholdingRates = [] }) {
  const [customerId, setCustomerId] = useState(customers[0]?.id || "");
  const [regimeIva, setRegimeIva] = useState("GERAL");
  const [withholdingRatePct, setWithholdingRatePct] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || "");
  const [qty, setQty] = useState(1);

  const selectedProduct = products.find((p) => p.id === Number(selectedProductId));
  const lineBase = selectedProduct ? selectedProduct.price * qty : 0;
  const vatAmount = regimeIva === "EXCLUSAO" ? 0 : round2(lineBase * ((selectedProduct?.taxRate || 0) / 100));
  const withholdingAmount = round2(lineBase * (withholdingRatePct / 100));

  const totals = useMemo(() => {
    const gross = round2(lineBase + vatAmount);
    return {
      taxableBase: round2(lineBase),
      vatAmount,
      withholdingAmount,
      netPayable: round2(gross - withholdingAmount)
    };
  }, [lineBase, vatAmount, withholdingAmount]);

  return (
    <section>
      <h2>Criar Factura</h2>
      <label>Cliente</label>
      <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.name}</option>
        ))}
      </select>

      <label>Regime IVA</label>
      <select value={regimeIva} onChange={(e) => setRegimeIva(e.target.value)}>
        <option value="GERAL">Geral</option>
        <option value="SIMPLIFICADO">Simplificado</option>
        <option value="EXCLUSAO">Exclusão</option>
      </select>

      <label>Retenção na Fonte</label>
      <select value={withholdingRatePct} onChange={(e) => setWithholdingRatePct(Number(e.target.value))}>
        <option value={0}>Sem retenção</option>
        {withholdingRates.map((rate) => (
          <option key={rate.id} value={rate.ratePct}>{rate.name} ({rate.ratePct}%)</option>
        ))}
      </select>

      <label>Produto</label>
      <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.description}</option>
        ))}
      </select>

      <label>Quantidade</label>
      <input type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} />

      <div>
        <strong>Base Tributável:</strong> {totals.taxableBase.toFixed(2)} AOA
      </div>
      <div>
        <strong>IVA:</strong> {totals.vatAmount.toFixed(2)} AOA
      </div>
      <div>
        <strong>Retenção:</strong> {totals.withholdingAmount.toFixed(2)} AOA
      </div>
      <div>
        <strong>Total a Pagar:</strong> {totals.netPayable.toFixed(2)} AOA
      </div>
    </section>
  );
}
