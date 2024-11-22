import { Producto } from "./Producto.interface";
import {Descuento} from "";

export interface ItemCarrito{
    producto: Producto;
    cantidad: number;
    descuentoAplicado?: Descuento;
}