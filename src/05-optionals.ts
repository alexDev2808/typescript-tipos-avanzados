export const createProduct = (
    id: string | number,
    isNew?: boolean,
    stock?: number,

) => {
    return {
        id,
        // || puede causar cietos errores
        stock: stock ?? 10,
        isNew: isNew ?? true
    }
}

const p1 = createProduct(3, true, 14);
console.log(p1);

const p2 = createProduct(6);
console.log(p2);

// No se ejecuta como queremos con ||
const p3 = createProduct(8, false, 0);
console.log(p3);
