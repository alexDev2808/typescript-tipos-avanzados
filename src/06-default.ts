export const createProduct = (
    id: string | number,
    isNew: boolean = true,
    stock: number = 5,

) => {
    return {
        id,
        stock,
        isNew
    }
}

const p1 = createProduct(3, true, 14);
console.log(p1);

const p2 = createProduct(6);
console.log(p2);

const p3 = createProduct(8, false, 0);
console.log(p3);
