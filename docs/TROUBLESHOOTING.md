# Troubleshooting — ESIVAYO ERP

## Erro: `Uncaught SyntaxError` ao executar `mkdir` / `cd`

Se você vir algo como:

```text
Welcome to Node.js vXX
Type ".help" for more information.
> mkdir esivayo-erp
Uncaught SyntaxError: Unexpected identifier
```

isso significa que os comandos de sistema (`mkdir`, `cd`, `npm ...`) foram executados dentro do **REPL do Node.js** (`>`), e não no terminal do sistema (`bash`, `zsh`, PowerShell, CMD).

## Como resolver

1. Saia do REPL do Node:
   - digite `.exit` e pressione Enter, **ou**
   - pressione `Ctrl + D`.

2. Confirme que está no shell do sistema (ex.: prompt termina com `$` no Linux/macOS).

3. Só então execute os comandos:

```bash
cd backend
npm install
npm start
```

## Dica rápida

- Prompt `>` = Node REPL (JavaScript interativo).
- Prompt `$` (ou similar) = Shell do sistema (onde `mkdir`, `cd`, `npm` funcionam normalmente).
