describe("cypress can assert to multiple targets and simulate user interaction", () => {
  it("updates the value when the user types", () => {
    cy.visit("/");

    cy.findByRole("textbox").type("hola");

    cy.get("#name").should("have.value", "hola");
    cy.get("#name").contains("hola").should("not.be.empty");

    cy.url().should("equal", "http://localhost:3000/");

    cy.window().its("document.location.href").should("contain", "http://localhost:3000/");

    cy.window().its("localStorage.token").should("not.exist");
  });

});