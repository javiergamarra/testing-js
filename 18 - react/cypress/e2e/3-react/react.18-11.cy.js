describe("cypress has extensive configuration", () => {
  it("takes screenshots after using cypress testing library", () => {
    cy.visit("/");

    cy.findByRole("button", { name: /Enable/i }).click();

    cy.contains("enabled").should("exist");

    cy.screenshot();
  });

});