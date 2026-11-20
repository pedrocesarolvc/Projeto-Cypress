// Funcionalidade: Carrinho (RF-04, RF-05, RF-06)
describe("Carrinho de compras", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
  });

  it("RF-04 - deve adicionar produtos ao carrinho e atualizar o contador", () => {
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");
    cy.get('[data-test="remove-sauce-labs-backpack"]').should(
      "have.text",
      "Remove"
    );

    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");
    cy.screenshot("RF-04-contador-carrinho");
  });

  it("RF-05 - deve remover produto do carrinho", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "2");

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");
    cy.get('[data-test="inventory-item"]').should("have.length", 2);

    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    cy.get('[data-test="inventory-item"]').should("have.length", 1);
    cy.contains('[data-test="inventory-item-name"]', "Sauce Labs Backpack").should(
      "not.exist"
    );
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");

    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();
    cy.get('[data-test="inventory-item"]').should("not.exist");
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    cy.screenshot("RF-05-carrinho-vazio");
  });

  it("RF-06 - deve manter nome, preço e quantidade do produto no carrinho", () => {
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

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should("include", "/cart.html");

    cy.get('[data-test="inventory-item"]')
      .should("have.length", 1)
      .within(() => {
        cy.get('[data-test="inventory-item-name"]').should(($el) => {
          expect($el.text()).to.eq(nome);
        });
        cy.get('[data-test="inventory-item-price"]').should(($el) => {
          expect($el.text()).to.eq(preco);
        });
        cy.get('[data-test="item-quantity"]').should("have.text", "1");
      });
    cy.screenshot("RF-06-consistencia-carrinho");
  });
});
