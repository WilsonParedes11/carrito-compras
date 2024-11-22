import { Producto } from "./Producto.interface";
import { Descuento } from "../types/Descuento.type";

export interface ItemCarrito{
    producto: Producto;
    cantidad: number;
    descuentoAplicado?: Descuento;
}