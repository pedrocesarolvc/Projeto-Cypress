// Fluxo E2E (RF-01 a RF-08):
// Autenticação → Listagem → Seleção de produto → Carrinho → Checkout → Confirmação
describe("E2E - Jornada completa de compra", () => {
  it("deve concluir uma compra do login até a confirmação", () => {
    // 1. Autenticação
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");

    // 2. Listagem de produtos
    cy.get('[data-test="title"]').should("have.text", "Products");
    cy.get('[data-test="inventory-item"]').should("have.length", 6);

    // 3. Seleção de produto (guarda nome e preço para comparar depois)
    let nome;
    let preco;
    cy.get('[data-test="inventory-item"]')
      .first()
      .within(() => {
        cy.get('[data-test="inventory-item-name"]')
          .invoke("text")
          .then((t) => (nome = t));
        cy.get('[data-test="inventory-item-price"]')
          .invoke("text")
          .then((t) => (preco = t));
        cy.get("button").click();
      });
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");

    // 4. Carrinho
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item"]').should("have.length", 1);
    cy.get('[data-test="inventory-item-name"]').should(($el) => {
      expect($el.text()).to.eq(nome);
    });
    cy.get('[data-test="inventory-item-price"]').should(($el) => {
      expect($el.text()).to.eq(preco);
    });
    cy.screenshot("E2E-1-carrinho");

    // 5. Checkout - dados do comprador
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
    cy.get('[data-test="firstName"]').type("Maria");
    cy.get('[data-test="lastName"]').type("Silva");
    cy.get('[data-test="postalCode"]').type("50000-000");
    cy.get('[data-test="continue"]').click();

    // 5.1 Resumo do pedido
    cy.url().should("include", "/checkout-step-two.html");
    cy.get('[data-test="title"]').should("have.text", "Checkout: Overview");
    cy.get('[data-test="inventory-item-name"]').should(($el) => {
      expect($el.text()).to.eq(nome);
    });
    cy.get('[data-test="subtotal-label"]').should(($el) => {
      expect($el.text()).to.contain(preco.replace("$", ""));
    });
    cy.screenshot("E2E-2-resumo-pedido");

    // 6. Confirmação da compra
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get('[data-test="title"]').should("have.text", "Checkout: Complete!");
    cy.get('[data-test="complete-header"]').should(
      "have.text",
      "Thank you for your order!"
    );
    cy.get('[data-test="complete-text"]').should("be.visible");
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    cy.screenshot("E2E-3-confirmacao-compra");
  });
});
