describe("Craeted category", function() {
  beforeEach(function() {
    cy.login(
      Cypress.env("circabc.admin.username"),
      Cypress.env("circabc.admin.password")
    );
  });

  afterEach(function() {
    // cy.logout();
  });

  it("successfully created category", function() {
    cy.visit("admin/headers", {
      failOnStatusCode: false
    });
    cy.get("[data-cy=add-category]").click();
    cy.get("[data-cy=name]").type(Cypress.env("category.name"));
    cy.get("[data-cy=title]")
      .get("[data-cy=text]")
      .type(Cypress.env("category.description"));
    cy.get("[data-cy=headers]").select(Cypress.env("header.name"));
    cy.get("[data-cy=admins]").click();
    cy.get("#name").type(Cypress.env("category.admin.username"));
    cy.get('[data-cy=search-button]').click();
    cy.get("[data-cy=users]").select(
      Cypress.env("category.admin.first.name") +
        " " +
        Cypress.env("category.admin.last.name") +
        " (" +
        Cypress.env("category.admin.email") +
        ")"
    );

    // cy.get('[data-cy=users]').select(
    //   "0: '" + Cypress.env('category.admin.username') + "'"
    // );
    cy.get("[data-cy=add-selection]").click();
    cy.get("[data-cy=ok").click();
    //cy.get('.buttons-group>.cta').click();
  });
});
