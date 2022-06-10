describe("my 3-react app renders", () => {
  it("I can click the enable button", () => {
    cy.visit("/");

    cy.get(".button").click();

    cy.contains("enabled").should("exist");
  });

});