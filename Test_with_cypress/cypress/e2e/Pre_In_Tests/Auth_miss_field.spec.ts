it("should display validation error when required fields are missing", function () {
  const validPassword = "Valid123!";

  cy.visit("/signup");

  // Leave first name blank
  cy.getBySel("signup-last-name").type("tes1");
  cy.getBySel("signup-username").type("test1");
  cy.getBySel("signup-password").type(validPassword);
  cy.getBySel("signup-confirmPassword").type(validPassword);

  // Check that the correct error message appears
  cy.get("#firstName-helper-text")
    .should("be.visible")
    .and("contain", "First Name is required");

});
