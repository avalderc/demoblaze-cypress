const { Given, When, Then, Before } = require("@badeball/cypress-cucumber-preprocessor");

Before(function(){
  cy.wrap(undefined).as("body");
})

Given("configuramos el body", (table) => {
  // convertimos el table en array
  const dt = table.raw();
  // extraemos primera fila: columnas 
  const columns = dt.shift();
  // convertimos filas en array de objectos o map
  const obj = Object.fromEntries(dt);
  // asignamos
  cy.wrap(obj).as("body");
  body = obj;
});
Given("configuramos el body con usuario random", (table) => {
  // convertimos el table en array
  const dt = table.raw();
  // extraemos primera fila: columnas
  const columns = dt.shift();
  // convertimos filas en array de objectos o map
  const obj = Object.fromEntries(dt);
  obj.username = obj.username + Date.now()
  // asignamos
  cy.wrap(obj).as("body");
  body = obj;
});
Given("configuramos el body con password hash", (table) => {
  // convertimos el table en array
  const dt = table.raw();
  // extraemos primera fila: columnas
  const columns = dt.shift();
  // convertimos filas en array de objectos o map
  const obj = Object.fromEntries(dt);
  obj.password = btoa(obj.password)
  // asignamos
  cy.wrap(obj).as("body");
  body = obj;
});

When("ejecutamos el api", (table)=>{
  // convertimos el table en array
  const dt = table.raw();
  // extraemos primera fila: columnas
  const columns = dt.shift();
  console.log( cy.get("@body") )
  console.log(body)
  // configuración de api
  const reqOpts = {
    url: dt[0][columns.indexOf("url")],
    method: dt[0][columns.indexOf("method")],
  };
  cy.get("@body").then(b=>{
    if(b && !reqOpts.body) reqOpts.body = b
  })
  // ejecutamos el api y guardamos
  cy.request(reqOpts).as("response");
});

Then("validamos codigo de respuesta {int}", (statusCode)=>{
  // validamos api
  cy.get("@response").then(res=>{
    //validamos codigo
    expect(res.status).to.equal(statusCode);
  });
})

Then("validamos que respuesta no tengo mensaje de error", ()=>{
  // validamos api
  cy.get("@response").then(res=>{
    //validamos codigo
    expect(res.body).not.have.property("errorMessage")
  });
})

Then("validamos mensaje de error de respuesta {string}", (errMsg)=>{
  // validamos api
  cy.get("@response").then(res=>{
    //validamos codigo
    expect(res.body).have.property("errorMessage");
    expect(res.body.errorMessage).to.contain(errMsg)
  });
})

Then("validamos que respuesta contenga {string}", (msg)=>{
  // validamos api
  cy.get("@response").then(res=>{
    //validamos codigo
    expect(res.body).to.contain(msg);
  });
})