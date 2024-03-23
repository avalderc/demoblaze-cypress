const { Given, When, Then,  } = require("@badeball/cypress-cucumber-preprocessor");

Given("visito la web de openblaze", () => {
  cy.visit("https://www.demoblaze.com/");
});

Given("agrego un producto", () => {
  //Encontramos y asignamos el link del producto
  cy.get("#tbodyid .card-block a").first().should("be.visible").as("productLink");
  //Guardamos el texto del producto
  cy.get("@productLink").then($a=>{
    const productLinkName = $a.text();
    cy.wrap(productLinkName).as('productLinkName');
  });
  //Ingresamos al producto
  cy.get("@productLink").scrollIntoView().click();
  //Validamos carga del detalle del producto
  cy.get("@productLinkName").then(txt=>{
    cy.get(".product-content h2.name").should("be.visible").should("contain.text", txt )
  })
  //Click en el boton agregar al carrito
  cy.get("a[onClick^='addToCart']").should("be.visible").click();
  cy.on('window:alert', (str) => expect(str).to.equal("Product added"));
  cy.on('window:confirm', () => true);
});

When("visualizo el carrito", () => {
  //Dar click en carrito
  cy.get("#cartur").click();
  //Valido estoy en la url del carrito
  cy.location("pathname").should("contain", "cart");
  //Visualizo el carrito
    // Visualizo el título
  cy.get("h2").contains("Products").should("be.visible");
    // Visualizo productos
  cy.get("#tbodyid tr").should("have.length.gt", 0);
});

When("completo el formulario", () => {
  //Click en enviar formulario
  cy.get("button[data-target='#orderModal']").click();
  //LLenamos el formulario (Solo es necesario Name y Credit Card)
  cy.get("#name").should("be.visible").invoke("val", "Alan Valderrama");
  cy.get("#card").should("be.visible").invoke("val", "1234567890123456");
  // Enviamos el formulario
  cy.get("button[onclick^='purchaseOrder']").should("be.visible").scrollIntoView().click();
});

Then("valido se haya finalizado la compra", () => {
  cy.get("h2").contains("Thank you for your purchase!").should("be.visible");
  cy.get(".sweet-alert.showSweetAlert.visible button.confirm").should("be.visible").click();
});