// Funcionalidade: Listagem de produtos (RF-03)
describe("Listagem de produtos", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
  });

  it("RF-03 - deve listar os 6 produtos com nome, preço e botão de adicionar", () => {
    cy.get('[data-test="inventory-item"]').should("have.length", 6);

    cy.get('[data-test="inventory-item"]').each(($item) => {
      cy.wrap($item).within(() => {
        cy.get('[data-test="inventory-item-name"]')
          .should("be.visible")
          .and("not.be.empty");
        cy.get('[data-test="inventory-item-price"]')
          .should("be.visible")
          .invoke("text")
          .should("match", /^\$\d+\.\d{2}$/);
        cy.get("button").should("contain.text", "Add to cart");
      });
    });

    cy.get('[data-test="inventory-item-name"]')
      .first()
      .should("have.text", "Sauce Labs Backpack");
    cy.screenshot("RF-03-listagem-produtos");
  });
});
