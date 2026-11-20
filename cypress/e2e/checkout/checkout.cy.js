// Funcionalidade: Dados do checkout (RF-07)
describe("Checkout - dados do comprador", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("RF-07 - deve exibir erro quando os dados obrigatórios não são preenchidos", () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "First Name is required");

    cy.get('[data-test="firstName"]').type("Maria");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain.text", "Last Name is required");

    cy.get('[data-test="lastName"]').type("Silva");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should(
      "contain.text",
      "Postal Code is required"
    );
    cy.url().should("include", "/checkout-step-one.html");
    cy.screenshot("RF-07-checkout-validacao");
  });

  it("RF-07 - deve avançar para o resumo com todos os dados preenchidos", () => {
    cy.get('[data-test="firstName"]').type("Maria");
    cy.get('[data-test="lastName"]').type("Silva");
    cy.get('[data-test="postalCode"]').type("50000-000");
    cy.get('[data-test="continue"]').click();

    cy.url().should("include", "/checkout-step-two.html");
    cy.get('[data-test="title"]').should("have.text", "Checkout: Overview");
    cy.get('[data-test="inventory-item-name"]').should(
      "have.text",
      "Sauce Labs Backpack"
    );
  });
});
