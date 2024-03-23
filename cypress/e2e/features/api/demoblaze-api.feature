Feature: Auth de demoblaze
  como usuario
  quiero autenticarme en demoblaze
  para realizar mis compra

  Scenario: [HappyPath] Crear un nuevo usuario
    Given configuramos el body con usuario random
      | key      | value      |
      | username | randomuser |
      | password | 123456     |
    When ejecutamos el api
      | url                              | method |
      | https://api.demoblaze.com/signup | POST   |
    Then validamos codigo de respuesta 200
    And validamos que respuesta no tengo mensaje de error

  Scenario: [UnHappyPath] Intentar crear un usuario ya existente
    Given configuramos el body
      | key      | value        |
      | username | usuariodevsu |
      | password | 123456       |
    When ejecutamos el api
      | url                              | method |
      | https://api.demoblaze.com/signup | POST   |
    Then validamos codigo de respuesta 200
    And validamos mensaje de error de respuesta "This user already exist."


  Scenario: [HappyPath] Login - usuario y password correctos
    Given configuramos el body con password hash
      | key      | value        |
      | username | usuariodevsu |
      | password | 123456       |
    When ejecutamos el api
      | url                             | method  |
      | https://api.demoblaze.com/login | POST    |
    Then validamos codigo de respuesta 200
    And validamos que respuesta no tengo mensaje de error
    And validamos que respuesta contenga "Auth_token"

  Scenario: [UnHappyPath] Login - usuario incorrecto
    Given configuramos el body con password hash
      | key      | value          |
      | username | usuariodevsu_ |
      | password | 123456         |
    When ejecutamos el api
      | url                             | method |
      | https://api.demoblaze.com/login | POST   |
    Then validamos codigo de respuesta 200
    And validamos mensaje de error de respuesta "User does not exist."

  Scenario: [UnHappyPath] Login - password incorrecto
    Given configuramos el body con password hash
      | key      | value        |
      | username | usuariodevsu |
      | password | 12345        |
    When ejecutamos el api
      | url                             | method |
      | https://api.demoblaze.com/login | POST   |
    Then validamos codigo de respuesta 200
    And validamos mensaje de error de respuesta "Wrong password."
