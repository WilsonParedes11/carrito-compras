export class CarritoError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'CarritoError';
    }
}