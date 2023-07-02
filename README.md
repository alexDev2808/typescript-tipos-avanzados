# TypeScript Tipos Avanzados

### Enum

Un enum es un tipo de dato que nos permite crear un set de opciones. Estas opciones son almacenadas bajo una estructura llave-valor similar a un objeto.
Enums en TypeScript

Veamos algunos aspectos de los enums en TypeScript:

1.     Los declaramos usando la palabra reservada enum seguido del nombre que tendrá este.
2.     Entre llaves estarán los datos llave-valor.
3.     Se recomienda que el nombre del enum y de las llaves dentro del mismo estén en mayúscula:

La ventaja que nos da esto es que disponemos de una lista de valores predeterminados que podemos asignar a una variable o a un atributo de la misma. Por tanto, no podemos asignar otro valor que no este dentro de las opciones que nos brinde el enum


### Tuplas 

Las tuplas o tuples nos permiten crear un array fuertemente tipado especificando el tipo de dato de cada elemento, así como una cantidad definida de elementos que podrá almacenar.

Las tuplas no vienen en el conjunto de tipos de datos por defecto de JavaScript.

#### Tuplas en TypeScript

Las definimos indicando entre [] el tipo de dato que cada elemento tendrá en la tupla.

`const user: [string, number] = ['Alexis', 22];`

Al definir el tipado de cada uno también estamos definiendo la cantidad de valores que tendrá la tupla, por tanto, no podemos agregar más elementos.

### Desestructuracion

Podemos aplicar desestructuración para asignar a ciertas variables respectivamente los valores dentro de una tupla.

    const user: [string, number] = ['Alexis', 34];
    const [username, age] = user;
    console.log(username);

#### Unknown type

El unknown type nos indica que una variable es de un tipo de dato desconocido. Es similar a any, pero sin quitar el análisis de código estático que nos brinda TypeScript.

El tipo unknown nos fuerza a hacer una verificación de tipo. Esta es la forma que TypeScript sugiere trabajar con variables de las cuales no sabemos de qué tipo serán. Así evitamos utilizar constantemente any.

#### Unknown type en TypeScript

Usamos el keyword unknown para declarar una variable de este tipo.

    let unknownVar: unknown;

#### Unknown vs. Any

Con any podemos hacer lo que queramos, no hay restricción alguna, pero con unknown vamos a tener advertencias al momento de utilizar alguna función o método con variables de este tipo.

    let unknownVar: unknown;

    unknownVar.toUpperCase(); // Nos marcará el editor una advertencia

Por ejemplo, no podemos directamente aplicar un método propio de un string a una variable unknown. Para ello debemos realizar una verificación de tipo para asegurarnos que se ejecutará dicho método siempre cuando unknownVar sea del tipo string en algún punto del programa:

    let unknownVar: unknown;

    if (unknownVar === 'string') {
        unknownVar.toUpperCase(); // Ahora ya no nos marcará como error.
    }

#### Unknown en funciones

También podemos emplear unknown en funciones si no sabemos exactamente que nos va a devolver.

    const parse = (str: string): unknown => {
        return JSON.parse(str)
    }
