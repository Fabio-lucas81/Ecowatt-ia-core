const TAX_REGIMES = {
  GERAL: { code: "GERAL", requiresVat: true, description: "Regime Geral de IVA" },
  SIMPLIFICADO: { code: "SIMPLIFICADO", requiresVat: true, description: "Regime Simplificado de IVA" },
  EXCLUSAO: { code: "EXCLUSAO", requiresVat: false, description: "Operação isenta/excluída de IVA" }
};

module.exports = { TAX_REGIMES };
