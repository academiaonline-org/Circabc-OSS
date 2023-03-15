describe("The Login Page", function() {
  beforeEach(function() {
    cy.login(Cypress.env("admin.username"), Cypress.env("admin.password"));
  });

  afterEach(function() {
    // cy.logout();
  });
  it("successfully login", function() {
    cy.visit("/" + "admin/headers", {
      failOnStatusCode: false
    });
    cy.get("[data-cy=add-header]").click();
    cy.get("[data-cy=name]").type(Cypress.env("header.name"));
    cy.get("[data-cy=description]")
      .get("[data-cy=text]")
      .type(Cypress.env("header.description"));
    cy.get("[data-cy=ok").click();
  });
});
