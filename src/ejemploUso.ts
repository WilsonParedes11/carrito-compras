import { Producto } from "./domain/interfaces/Producto.interface";
import { CarritoCompras } from "./domain/models/CarritoCompras";

function ejemploUso(): void {
    const carrito = new CarritoCompras();

    // Crear algunos productos
    const producto1: Producto = {
        id: 1,
        nombre: "Laptop",
        precio: 1000,
        categoria: "electronica",
        disponible: true
    };

    const producto2: Producto = {
        id: 2,
        nombre: "Camiseta",
        precio: 20,
        categoria: "ropa",
        disponible: true
    };

    // Agregar productos al carrito
    carrito.agregarProducto(producto1);
    carrito.agregarProducto(producto2, 2);

    // Aplicar descuentos
    carrito.aplicarDescuento(1, { tipo: "porcentaje", valor: 10 });
    carrito.aplicarDescuento(2, { 
        tipo: "compra_multiple", 
        cantidadMinima: 2, 
        descuentoPorcentaje: 15 
    });

    // Obtener resumen
    console.log(carrito.obtenerResumen());
}