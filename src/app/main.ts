import { faker } from '@faker-js/faker';
import { addProduct, products } from "./products/products.service";


for (let index = 0; index < 50; index++) {

    addProduct({
        id: faker.string.uuid(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        color: faker.color.human(),
        size: faker.helpers.arrayElement(['M', 'S', 'XL', 'L']),
        price: parseInt(faker.commerce.price()),
        isNew: faker.datatype.boolean(),
        tags: faker.helpers.arrayElements(['Tag1', 'Tag2', 'Tag3']),
        title: faker.commerce.productName(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        stock: faker.helpers.rangeToNumber({min: 10, max: 100}),
        category: {
            id: faker.string.uuid(),
            name: faker.commerce.department(),
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent()
        }
    })  
}


console.log(products);


