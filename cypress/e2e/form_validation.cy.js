describe("Validar formulário de cadastro", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.title({ timeout: 2000 }).should("eq", "JS Form Validation");
  });
  it("Campo e-mail deve estar preenchido", () => {
    //preenche campo e-mail incomplento
    cy.contains("E-mail:").should("be.visible");
    cy.get('[id="mail"]').type("testing@");

    //clica em campo confirmal e-mail
    cy.get('[name="confirm-mail"]').click();

    //Vejo mensagem de erro informando que o campo e-mail esta incompleto
    cy.contains("Entered value needs to be an email address.").should("be.visible");
  });

  it("Campo confirmar e-mail deve conter e-mail ingual ao primeiro", () => {
    //preenche campo e-mail incomplento
    cy.contains("Confirm e-mail:").should("be.visible");
    cy.get('[name="confirm-mail"]').type("testing@");

    //clica em campo e-mail novamente
    cy.contains("SUBMIT").click();

    //Vejo mensagem de erro informando que o campo e-mail esta incompleto
    cy.contains(
      "The confirmed email does not match the original email. Please check and try to submit again."
    ).should("be.visible");
  });

  it("Valor de zip code deve corresponder a sua Country", () => {
    //seleciono brasil
    cy.contains("Country:").should("be.visible");
    cy.get('[id="country"]').select("br");

    cy.contains("SUBMIT").click();

    //Vejo mensagem de como o zip deve ser preenchido
    cy.contains("Brazilian ZIPs must have exactly 8 digits: e.g. 12345-678 or 12345678").should(
      "be.visible"
    );

    //Verifico as outras regiões
    cy.get('[id="country"]').select("fr");

    //Vejo mensagem de como o zip deve ser preenchido
    cy.contains("France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012").should(
      "be.visible"
    );

    cy.get('[id="country"]').select("de");

    //Vejo mensagem de como o zip deve ser preenchido
    cy.contains("Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345").should(
      "be.visible"
    );

    cy.get('[id="country"]').select("ch");

    //Vejo mensagem de como o zip deve ser preenchido

    cy.contains("Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950").should(
      "be.visible"
    );

    cy.get('[id="country"]').select("nl");

    //Vejo mensagem de como o zip deve ser preenchido
    cy.contains(
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS"
    ).should("be.visible");
  });

  it("Campo passsword não deve ficar em branco", () => {
    cy.contains("Password").should("be.visible");

    cy.contains("SUBMIT").click();

    cy.contains("You need to enter a password.").should("be.visible");
  });

  it("Campo confirmar password não deve ficar em branco", () => {
    cy.contains("Confirm Password").should("be.visible");

    cy.contains("SUBMIT").click();

    cy.contains("This field can't be empty!").should("be.visible");
  });

  it("Campos passwords deve ser iguais", () => {
    cy.contains("Password").should("be.visible");

    cy.get('[id="password"]').type("123");

    cy.get('[name="password-confirmation"]').type("12345678");
    cy.contains("SUBMIT").click();

    cy.contains(
      "The confirmed password does not match the original password. Please check and try to submit again."
    ).should("be.visible");
  });

  it("Deve preencher os dados e enviar o formulário com sucesso", () => {
    cy.contains("E-mail:").should("be.visible");
    cy.get('[id="mail"]').type("5VXKm@example.com");

    cy.contains("Confirm e-mail:").should("be.visible");
    cy.get('[name="confirm-mail"]').type("5VXKm@example.com");

    cy.contains("Country:").should("be.visible");
    cy.get('[id="country"]').select("br");

    cy.contains("Zip Code:").should("be.visible");
    cy.get('[id="zipcode"]').type("12345678");

    cy.contains("Password").should("be.visible");
    cy.get('[id="password"]').type("12345678");

    cy.contains("Confirm Password").should("be.visible");
    cy.get('[name="password-confirmation"]').type("12345678");

    cy.contains("SUBMIT").click();

    cy.contains("5VXKm@example.com").should("not.exist");
  });
});
