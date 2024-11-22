import { ItemCarrito } from "../interfaces/ItemCarrito.interface";
import { Producto } from "../interfaces/Producto.interface";
import { Descuento } from "../types/Descuento.type";

export class CarritoCompras {

    private items: Map<number, ItemCarrito> = new Map();

    // Agregar producto al carrito
    agregarProducto(producto: Producto, cantidad: number = 1): void {
        if (!producto.disponible) {
            throw new Error(`El producto ${producto.nombre} no está disponible`);
        }

        const itemExistente = this.items.get(producto.id);
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.items.set(producto.id, { producto, cantidad });
        }
    }

    // Remover producto del carrito
    removerProducto(productoId: number): void {
        if (!this.items.delete(productoId)) {
            throw new Error('Producto no encontrado en el carrito');
        }
    }

    // Actualizar cantidad de un producto
    actualizarCantidad(productoId: number, cantidad: number): void {
        const item = this.items.get(productoId);
        if (!item) {
            throw new Error('Producto no encontrado en el carrito');
        }

        if (cantidad <= 0) {
            this.items.delete(productoId);
        } else {
            item.cantidad = cantidad;
        }
    }

    // Aplicar descuento a un producto
    aplicarDescuento(productoId: number, descuento: Descuento): void {
        const item = this.items.get(productoId);
        if (!item) {
            throw new Error('Producto no encontrado en el carrito');
        }

        // Validar descuento
        if (descuento.tipo === 'porcentaje' && (descuento.valor <= 0 || descuento.valor > 100)) {
            throw new Error('Porcentaje de descuento inválido');
        }

        if (descuento.tipo === 'compra_multiple' && item.cantidad < descuento.cantidadMinima) {
            throw new Error('Cantidad insuficiente para aplicar descuento por compra múltiple');
        }

        item.descuentoAplicado = descuento;
    }

    // Calcular descuento para un item
    private calcularDescuentoItem(item: ItemCarrito): number {
        if (!item.descuentoAplicado) return 0;

        const subtotal = item.producto.precio * item.cantidad;
        switch (item.descuentoAplicado.tipo) {
            case 'porcentaje':
                return subtotal * (item.descuentoAplicado.valor / 100);
            case 'cantidad_fija':
                return Math.min(subtotal, item.descuentoAplicado.valor);
            case 'compra_multiple':
                if (item.cantidad >= item.descuentoAplicado.cantidadMinima) {
                    return subtotal * (item.descuentoAplicado.descuentoPorcentaje / 100);
                }
                return 0;
        }
    }

    // Calcular total del carrito
    calcularTotal(): { subtotal: number; descuentos: number; total: number } {
        let subtotal = 0;
        let descuentos = 0;

        this.items.forEach(item => {
            subtotal += item.producto.precio * item.cantidad;
            descuentos += this.calcularDescuentoItem(item);
        });

        return {
            subtotal,
            descuentos,
            total: subtotal - descuentos
        };
    }

    // Obtener resumen del carrito
    obtenerResumen(): {
        items: ItemCarrito[];
        totales: { subtotal: number; descuentos: number; total: number };
    } {
        return {
            items: Array.from(this.items.values()),
            totales: this.calcularTotal()
        };
    }
}