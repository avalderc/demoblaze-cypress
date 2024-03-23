Feature: Carrito de Compras de DemoBlaze
  como usuario
  quiero ingresar productos al carrito
  para realizar una compra

  Scenario: realizar una compra
    Given visito la web de openblaze
    And agrego un producto
    When visualizo el carrito
    And completo el formulario
    Then valido se haya finalizado la compra