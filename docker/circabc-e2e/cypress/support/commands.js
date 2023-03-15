// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';

// Cypress.Commands.add('badLogin', (username, password) => {
//   cy.visit("/");
//   cy.get('[data-cy=connect]').click();
//   cy.get('[data-cy=username]').type(username);
//   cy.get('[data-cy=password]').type(password);
//   cy.get('[data-cy=login]').click();
// });

Cypress.Commands.add('login', (username, password) => {
  
  // accept cookies  
  window.localStorage.setItem("agree-with-cookie", "yes");

  cy.request({
    method: 'POST',
    url: 'http://10.69.125.133/service/api/login?guest=true',
    body: {
      username: username,
      password: password
    }
  }).then(resp => {
    window.sessionStorage.setItem('ticket', resp.body.data.ticket);

    cy.request({
      method: 'GET',
      url: 'http://10.69.125.133/service/circabc/users/' + username,
      headers: { Authorization: 'Basic ' + btoa(resp.body.data.ticket) }
    }).then(resp => {
      let user = resp.body;
      window.sessionStorage.setItem('user.userId', user.userId);
      window.sessionStorage.setItem('user.email', user.email);
      window.sessionStorage.setItem('user.avatar', user.avatar);
      window.sessionStorage.setItem('user.firstname', user.firstname);
      window.sessionStorage.setItem('user.lastname', user.lastname);
      window.sessionStorage.setItem('user.phone', user.phone);
      window.sessionStorage.setItem(
        'user.contentFilterLang',
        user.contentFilterLang
      );
      window.sessionStorage.setItem('user.uiLang', user.uiLang);
      if (user.visibility) {
        window.sessionStorage.setItem(
          'user.visibility',
          user.visibility.toString()
        );
      }
      window.sessionStorage.setItem(
        'user.properties',
        JSON.stringify(user.properties)
      );
    });
  });
});

Cypress.Commands.add('logout', () => {
  let ticket = window.sessionStorage.getItem('ticket');
  if (ticket !== null) {
    cy.request({
      method: 'DELETE',
      url:
        'http://10.69.125.133/service/api/login/ticket/' +
        ticket +
        '?format=json',
      headers: { Authorization: 'Basic ' + btoa(ticket) }
    }).then(resp => {
      if (resp) {
        window.sessionStorage.removeItem('ticket');
        window.sessionStorage.removeItem('user.userId');
        window.sessionStorage.removeItem('user.email');
        window.sessionStorage.removeItem('user.avatar');
        window.sessionStorage.removeItem('user.first.name');
        window.sessionStorage.removeItem('user.last.name');
        window.sessionStorage.removeItem('user.phone');
        window.sessionStorage.removeItem('user.contentFilterLang');
        window.sessionStorage.removeItem('user.uiLang');
        window.sessionStorage.removeItem('user.visibility');
        window.sessionStorage.removeItem('user.properties');
      }
    });
  }
});
