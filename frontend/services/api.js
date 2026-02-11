const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export async function login(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error("Falha no login");
  return response.json();
}

export async function getInvoices(token) {
  const response = await fetch(`${API_BASE}/invoices`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Falha ao carregar facturas");
  return response.json();
}

export async function exportSaft(token, startDate, endDate) {
  const query = new URLSearchParams({ startDate, endDate }).toString();
  const response = await fetch(`${API_BASE}/export/saft?${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) throw new Error("Falha ao exportar SAF-T");
  return response.text();
}
