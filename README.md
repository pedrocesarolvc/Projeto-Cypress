# Automação de Testes UI e E2E com Cypress — SauceDemo

Suíte inicial de testes automatizados para o [SauceDemo](https://www.saucedemo.com/), cobrindo autenticação, listagem de produtos, carrinho, checkout e a jornada completa de compra.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

```bash
npm install
```

## Execução

Sem intervenção manual (headless), gera screenshots e vídeos:

```bash
npm test
```

Modo interativo:

```bash
npm run cy:open
```

Executar apenas uma funcionalidade:

```bash
npx cypress run --spec "cypress/e2e/carrinho/*.cy.js"
```

## Estrutura

```
cypress/e2e/
├── autenticacao/login.cy.js       # RF-01, RF-02
├── produtos/listagem.cy.js        # RF-03
├── carrinho/carrinho.cy.js        # RF-04, RF-05, RF-06
├── checkout/checkout.cy.js        # RF-07
└── e2e/compra-completa.cy.js      # RF-01 a RF-08 (jornada completa)
```

Os testes são independentes: cada um faz seu próprio login no `beforeEach` e não depende do estado de outro teste.

## Testes implementados (11)

| Arquivo | Teste | Requisito | Principais validações |
|---|---|---|---|
| login.cy.js | Credenciais válidas | RF-01 | URL `/inventory.html`, título "Products", carrinho visível |
| login.cy.js | Credenciais inválidas | RF-02 | Permanece no login, mensagem de erro exibida |
| login.cy.js | Usuário vazio | RF-02 | Mensagem "Username is required" |
| login.cy.js | Usuário bloqueado | RF-02 | Mensagem "locked out" |
| listagem.cy.js | Listagem de produtos | RF-03 | 6 itens, cada um com nome, preço (formato `$0.00`) e botão |
| carrinho.cy.js | Adicionar ao carrinho | RF-04 | Badge 1 → 2, botão muda para "Remove" |
| carrinho.cy.js | Remover do carrinho | RF-05 | Item some da lista, badge atualiza e desaparece |
| carrinho.cy.js | Consistência dos dados | RF-06 | Nome, preço e quantidade iguais aos da listagem |
| checkout.cy.js | Campos obrigatórios | RF-07 | Erros de First Name, Last Name e Postal Code |
| checkout.cy.js | Dados completos | RF-07 | Avança para `/checkout-step-two.html` |
| compra-completa.cy.js | Jornada E2E | RF-01 a RF-08 | Verificações em cada etapa até "Thank you for your order!" |

## Credenciais usadas

- Válido: `standard_user` / `secret_sauce`
- Bloqueado: `locked_out_user` / `secret_sauce`

## Evidências

- Screenshots dos testes: `cypress/screenshots/`
- Vídeos: `cypress/videos/`
- Para executar na nuvem (sem computador), o workflow `.github/workflows/cypress.yml` roda a suíte no GitHub Actions e publica screenshots e vídeos como artefatos da execução (aba **Actions**).

## Evidências da execução

Resultado da suíte no GitHub Actions: **11 testes, 11 aprovados** (aba Actions, execução "Testes Cypress #4").

- Screenshots: `evidencias/screenshots/` (um por requisito, RF-01 a RF-08, e três do fluxo E2E)
- Vídeos de cada arquivo de teste: `evidencias/videos/`

Para gerar novamente na nuvem: aba **Actions** → execução mais recente → seção **Artifacts** (`evidencias-screenshots` e `evidencias-videos`).
