it("should show error for password made of only numbers", function () {
  const weakPassword = "12345678"; // Only numbers, does not meet strong policy

  cy.visit("/signup");

  cy.getBySel("signup-first-name").type("John");
  cy.getBySel("signup-last-name").type("Doe");
  cy.getBySel("signup-username").type("JohnDoe123");

  // Enter a weak password (only numbers)
  cy.getBySel("signup-password").type(weakPassword);
  cy.getBySel("signup-confirmPassword").type(weakPassword);
  // The submit button should be disabled
  cy.getBySel("signup-submit").should("be.disabled");

  
});
