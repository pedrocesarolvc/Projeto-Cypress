// Funcionalidade: Autenticação (RF-01, RF-02)
describe("Autenticação", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("RF-01 - deve autenticar com credenciais válidas", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.url().should("include", "/inventory.html");
    cy.get('[data-test="title"]').should("have.text", "Products");
    cy.get('[data-test="shopping-cart-link"]').should("be.visible");
    cy.screenshot("RF-01-login-valido");
  });

  it("RF-02 - deve exibir erro com credenciais inválidas", () => {
    cy.get('[data-test="username"]').type("usuario_invalido");
    cy.get('[data-test="password"]').type("senha_errada");
    cy.get('[data-test="login-button"]').click();

    cy.url().should("not.include", "/inventory.html");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and(
        "contain.text",
        "Username and password do not match any user in this service"
      );
    cy.screenshot("RF-02-login-invalido");
  });

  it("RF-02 - deve exibir erro ao tentar login sem informar usuário", () => {
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Username is required");
  });

  it("RF-02 - deve bloquear usuário bloqueado (locked_out_user)", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Sorry, this user has been locked out");
  });
});
