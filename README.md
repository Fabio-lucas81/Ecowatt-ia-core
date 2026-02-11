# ESIVAYO ERP

Sistema base de facturação e ERP preparado para requisitos fiscais de Angola (AGT), incluindo cálculo de IVA, retenção na fonte, certificação e exportação SAF-T (AO).

## Estrutura

```text
/backend
  /config        # Configurações de regimes de IVA
  /controllers   # Regras de endpoint
  /middleware    # JWT auth/authorization
  /models        # Modelo de dados SQL base
  /routes        # Rotas REST
  /services      # Lógica fiscal, SAF-T e armazenamento
  /tests         # Testes unitários
  /utils         # Utilitários (hash, validações, etc)
/frontend
  /components
  /views         # Exemplo de formulário de factura
  /services      # Cliente para API
/docs
  TROUBLESHOOTING.md
```

## Requisitos funcionais implementados

- Regimes de IVA (`GERAL`, `SIMPLIFICADO`, `EXCLUSAO`) configuráveis e aplicados por linha.
- Cálculo automático de IVA, base tributável, retenção na fonte e totais.
- Sequência e hash de documentos para preparação de certificação legal.
- Exportação SAF-T (AO) em XML com Header, MasterFiles, SalesInvoices e retenções.
- Autenticação JWT para APIs de facturação/exportação.
- Esquema SQL de referência com tabelas essenciais: `Users`, `Customers`, `Products`, `Invoices`, `InvoiceLines`, `WithholdingTaxRates`.

## Endpoints principais

- `POST /api/auth/login`
- `GET /api/invoices`
- `POST /api/invoices`
- `PUT /api/invoices/:id`
- `GET /api/export/saft?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

## Executar backend

> ⚠️ Execute estes comandos no **terminal do sistema** (bash/zsh/PowerShell), não no prompt `>` do Node REPL.

```bash
cd backend
npm install
npm start
```

## Testes

```bash
cd backend
npm test
```

## Troubleshooting

- Se aparecer `Uncaught SyntaxError` ao correr `mkdir` ou `cd`, veja: [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md).

## Observações para integração AGT

- A arquitectura está preparada para incluir integração API AGT no módulo de serviços.
- Para ambiente produtivo, substituir armazenamento em memória por PostgreSQL/Sequelize e adicionar assinatura/certificado oficial.
- Validar SAF-T contra XSD oficial AGT quando o schema estiver disponível.
