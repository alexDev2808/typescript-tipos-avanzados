import { addProduct } from "./products/products.service";

addProduct({
    id: 10,
    title: "Producto #1",
    createdAt: new Date(),
    stock: 80,
    category: {
        id: 45,
        name: "Computacion"
    }
})