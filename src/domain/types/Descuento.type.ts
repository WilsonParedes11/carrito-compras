export type Descuento = 
    | { tipo: 'porcentaje'; valor: number }
    | { tipo: 'cantidad_fija'; valor: number }
    | { tipo: 'compra_multiple'; cantidadMinima: number; descuentoPorcentaje: number };