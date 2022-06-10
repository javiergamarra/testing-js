describe("it can capture API requests", () => {
  it("returns a harcoded value when requesting an API", () => {
    cy.intercept("https://jsonplaceholder.typicode.com/todos/1", {
      body: { id: 1, name: "Pat" },
      headers: { "Content-Type": "application/json" }
    });

    cy.visit("/");

    cy.findByRole("button", { name: /API/i }).click();
  });

});