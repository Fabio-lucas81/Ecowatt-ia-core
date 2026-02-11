const data = {
  users: [
    { id: 1, name: "Admin", email: "admin@esivayo.co.ao", passwordHash: "$2a$10$vR7gP2qzQxtzrhy6kHN2AODD9YdzdrIW6DCeA44yWiNys8lm2Sle6", role: "admin" }
  ],
  customers: [
    { id: 1, name: "Cliente Exemplo", nif: "500000001", address: "Luanda" }
  ],
  products: [
    { id: 1, description: "Serviço de Consultoria", price: 100000, taxRate: 14 }
  ],
  withholdingRates: [
    { id: 1, name: "Serviços Gerais", ratePct: 6.5 },
    { id: 2, name: "Profissionais Liberais", ratePct: 10 }
  ],
  invoices: []
};

module.exports = { data };
