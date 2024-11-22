export interface Producto{
    id: number;
    nombre: string;
    precio: number;
    categoria: 'electronica' | 'ropa' | 'alimentos';
    disponible: boolean;
}