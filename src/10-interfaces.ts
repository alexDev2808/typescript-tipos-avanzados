type Sizes = 'S' | 'M' | 'L' | 'XL';

type userId = string | number;
// type Product = {
//     id: string | number;
//     title: string;
//     createdAt: Date;
//     stock: number;
//     size?: Sizes
// }

interface Product {
    id: string | number;
    title: string;
    createdAt: Date;
    stock: number;
    size?: Sizes
}

const products: Product[] = [];

products.push({
    id: 10,
    title: "Producto #1",
    createdAt: new Date(),
    stock: 80,
})

const addProduct = (data: Product) => {
    products.push(data)
}