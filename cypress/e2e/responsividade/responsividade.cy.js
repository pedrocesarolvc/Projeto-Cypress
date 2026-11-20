// Módulo 05 - Responsividade e experiência de navegação (RF-15 e RF-16)
describe("Módulo 05 - Responsividade e experiência de navegação", () => {
  const desktop = [1280, 800];
  const mobile = [375, 812];

  it("RF-15 [responsividade] elementos principais de navegação estão disponíveis no desktop", () => {
    cy.viewport(...desktop);
    cy.visit("/");

    cy.get("a.logo").first().should("be.visible");
    cy.get("#filter_keyword").should("be.visible");
    cy.get(".topcart").should("be.visible");
    cy.get('ul.categorymenu a[href$="path=43"]').first().should("be.visible");
    cy.get('ul.categorymenu a[href$="path=36"]').first().should("be.visible");
    cy.get(".navbar-toggle").should("not.be.visible");
    cy.screenshot("RF-15-navegacao-desktop");
  });

  it("RF-15 [responsividade] elementos principais de navegação estão disponíveis no mobile", () => {
    cy.viewport(...mobile);
    cy.visit("/");

    cy.get("a.logo").first().should("be.visible");
    cy.get(".navbar-toggle").first().should("be.visible");
    cy.get("#filter_keyword").should("be.visible");

    // o menu recolhido é aberto pelo botão e passa a exibir os links
    cy.get(".navbar-toggle").first().click();
    cy.get(".navbar-collapse.in, .navbar-collapse.collapse.show, .navbar-collapse")
      .first()
      .should("be.visible");
    cy.get(".topcart").should("exist");
    cy.screenshot("RF-15-navegacao-mobile");
  });

  it("RF-16 [responsividade] localiza produto pela busca e usa o carrinho em resolução mobile", () => {
    cy.viewport(...mobile);
    cy.visit("/");

    cy.get("#filter_keyword").type("bronzer");
    cy.get(".button-in-search").click();
    cy.url().should("include", "rt=product/search");
    cy.get(".thumbnails.grid .prdocutname")
      .should("have.length.greaterThan", 0)
      .first()
      .should("be.visible")
      .click();

    cy.url().should("include", "rt=product/product");
    cy.get("a.cart").should("be.visible").click();

    cy.url().should("include", "rt=checkout/cart");
    cy.get(".product-list").should("be.visible");
    cy.get('.product-list input[name^="quantity["]').first().should("be.visible").and("have.value", "1");
    cy.get(".topcart .label").should(($l) => expect($l.text().trim()).to.eq("1"));
    cy.get("#cart_checkout1, #cart_checkout2").first().should("exist");
    cy.screenshot("RF-16-carrinho-mobile");
  });
});
