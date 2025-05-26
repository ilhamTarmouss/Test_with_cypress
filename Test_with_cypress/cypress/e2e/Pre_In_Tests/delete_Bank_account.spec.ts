import { User } from "../../../src/models";

describe("Bank Account Tests", () => {
  
  it("should create a new bank account", function () {
    // Assuming the user is already logged in or login is handled in a before hook
    cy.getBySel("sidenav-bankaccounts").click();

    cy.getBySel("bankaccount-new").click();
    cy.location("pathname").should("eq", "/bankaccounts/new");
    cy.visualSnapshot("Display New Bank Account Form");

    cy.getBySelLike("bankName-input").type("The Best Bank");
    cy.getBySelLike("routingNumber-input").type("987654321");
    cy.getBySelLike("accountNumber-input").type("123456789");
    cy.visualSnapshot("Fill out New Bank Account Form");

    cy.getBySelLike("submit").click();
    cy.wait("@gqlCreateBankAccountMutation");

    cy.getBySelLike("bankaccount-list-item")
      .should("have.length.at.least", 1)
      .last()
      .should("contain", "The Best Bank");

    cy.visualSnapshot("Bank Account Created");
  });

  it("should login, delete a bank account, and verify deletion", () => {
    // Fetch a user from the database (assuming cy.database is set up)
    cy.database("find", "users").then((user: User) => {
      const username = user.username;
      const password = "s3cret"; // Adjust this as needed

      // === Step 1: Login ===
      cy.visit("/signin");
      cy.getBySel("signin-username").type(username);
      cy.getBySel("signin-password").type(password);
      cy.getBySel("signin-submit").click();

      // Wait for login to complete
      cy.location("pathname").should("eq", "/");

      // === Step 2: Navigate to Bank Accounts ===
      cy.visit("/bankaccounts");

      // === Step 3: Delete First Bank Account ===
      cy.getBySelLike("delete").first().click();

      // Wait for GraphQL mutation to complete
      cy.wait("@gqlDeleteBankAccountMutation");

      // === Step 4: Verify Account is Marked Deleted ===
      cy.getBySelLike("list-item")
        .first()
        .should("contain.text", "Deleted");

      cy.getBySelLike("list-item")
        .first()
        .within(() => {
          cy.getBySelLike("delete").should("not.exist");
        });

      // Optional: Visual snapshot
      cy.visualSnapshot("Soft Delete Bank Account");
    });
  });

});
