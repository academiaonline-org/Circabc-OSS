describe("Create users", function () {
  beforeEach(function () {
    cy.login(
      Cypress.env("circabc.admin.username"),
      Cypress.env("circabc.admin.password")
    );
  });

   
   
   it("successfully created category admin", function () {
    cy.visit("/me/roles", {
      failOnStatusCode: false,
    });
    cy.get("[data-cy=create-user]").click();
    cy.get("[data-cy=username]").type(Cypress.env("category.admin.username"));
    cy.get("[data-cy=firstname]").type(Cypress.env("category.admin.first.name"));
    cy.get("[data-cy=lastname]").type(Cypress.env("category.admin.last.name"));
    cy.get("[data-cy=email]").type(Cypress.env("category.admin.email"));
    cy.get("[data-cy=phone]").type(Cypress.env("category.admin.phone"));
    cy.get("[data-cy=postalAddress]").type(Cypress.env("category.admin.postalAddress"));
    cy.get("[data-cy=password]").type(Cypress.env("category.admin.password"));
    cy.get("[data-cy=passwordVerify]").type(Cypress.env("category.admin.password"));

    cy.get("[data-cy=create]").click();
  });


  it("successfully created interest group admin", function () {
    cy.visit("/me/roles", {
      failOnStatusCode: false,
    });
    cy.get("[data-cy=create-user]").click();
    cy.get("[data-cy=username]").type(Cypress.env("interest.group.admin.username"));
    cy.get("[data-cy=firstname]").type(Cypress.env("interest.group.admin.first.name"));
    cy.get("[data-cy=lastname]").type(Cypress.env("interest.group.admin.last.name"));
    cy.get("[data-cy=email]").type(Cypress.env("interest.group.admin.email"));
    cy.get("[data-cy=phone]").type(Cypress.env("interest.group.admin.phone"));
    cy.get("[data-cy=postalAddress]").type(Cypress.env("interest.group.admin.postalAddress"));
    cy.get("[data-cy=password]").type(Cypress.env("interest.group.admin.password"));
    cy.get("[data-cy=passwordVerify]").type(Cypress.env("interest.group.admin.password"));

    cy.get("[data-cy=create]").click();
    cy.contains("Success");
  });


  
});
