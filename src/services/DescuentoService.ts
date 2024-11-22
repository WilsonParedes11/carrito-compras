import { Descuento } from "../domain/types/Descuento.type";
import { ItemCarrito } from "../domain/interfaces/ItemCarrito.interface";
import { CarritoError } from "../errors/CarritoError";

export class DescuentoService {
    validarDescuento(item: ItemCarrito, descuento: Descuento): void {
        if (descuento.tipo === 'porcentaje' && (descuento.valor <= 0 || descuento.valor > 100)) {
            throw new CarritoError('El valor del descuento por porcentaje debe ser mayor a 0 y menor o igual a 100');
        }
    }

    calcularDescuento(item: ItemCarrito): number {
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
}