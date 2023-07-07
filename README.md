# TypeScript Tipos Avanzados

## Enum

Un enum es un tipo de dato que nos permite crear un set de opciones. Estas opciones son almacenadas bajo una estructura llave-valor similar a un objeto.
Enums en TypeScript

Veamos algunos aspectos de los enums en TypeScript:

1.     Los declaramos usando la palabra reservada enum seguido del nombre que tendrá este.
2.     Entre llaves estarán los datos llave-valor.
3.     Se recomienda que el nombre del enum y de las llaves dentro del mismo estén en mayúscula:

La ventaja que nos da esto es que disponemos de una lista de valores predeterminados que podemos asignar a una variable o a un atributo de la misma. Por tanto, no podemos asignar otro valor que no este dentro de las opciones que nos brinde el enum


## Tuplas 

Las tuplas o tuples nos permiten crear un array fuertemente tipado especificando el tipo de dato de cada elemento, así como una cantidad definida de elementos que podrá almacenar.

Las tuplas no vienen en el conjunto de tipos de datos por defecto de JavaScript.

#### Tuplas en TypeScript

Las definimos indicando entre [] el tipo de dato que cada elemento tendrá en la tupla.

`const user: [string, number] = ['Alexis', 22];`

Al definir el tipado de cada uno también estamos definiendo la cantidad de valores que tendrá la tupla, por tanto, no podemos agregar más elementos.

#### Desestructuracion

Podemos aplicar desestructuración para asignar a ciertas variables respectivamente los valores dentro de una tupla.

    const user: [string, number] = ['Alexis', 34];
    const [username, age] = user;
    console.log(username);

## Unknown type

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


## Never Type

El never type se usa para funciones que nunca van a terminar o que detienen el programa. Con esto TypeScript nos ayuda a detectarlos como por ejemplo un ciclo infinito cuando lanzamos un mensaje de error.

#### Never type en funciones infinitas

En el siguiente código, TypeScript infiere que el tipo es never, ya que su ejecución será infinita.

    const withoutEnd = () => {
        while (true) {
            console.log('Nunca parar de aprender');
        }
    }

#### Never vs. Void

Las funciones del tipo void son aquellas que no retornan ningún dato, simplemente ejecutan las instrucciones dentro del bloque de la función. Por tanto, no debemos confundirlas con las de tipo never:

    const voidFunc = () => {
    for(let i = 1; i <= 5; i++){
        console.log(i)
    }
    }

    voidFunc()

    /*
    // Función infinita y de tipo Never 👇
    const neverFunc = () => {
        while (true) {
            console.log('Nunca parar de aprender');
        }
    }
    */

#### Never type en código con errores

Una función también puede ser del tipo never cuando tenemos un throw que lance un error y, como resultado, haga detener la ejecución.

    const fail = (message: string) => { // TypeScript infiere que esta función se de tipo `never`
    throw new Error(message)
    }

    const example = (input:unknown) => {
    if(typeof input === 'string'){
        return 'Es un string';
    }
    else if (Array.isArray(input)){
        return 'Es un array';
    }
    return fail('Not Match'); // Lanzamos un error
    }

    console.log(example('Hola')) //'Es un string'
    console.log(example([1,1,1,1])) // 'Es un array'
    console.log(example(1212)) // error: Uncaught Error: Not Match
    console.log(example('Hola después del fail')) // NUNCA SE EJECUTA, porque se lanzó un error previamente


## Parámetros opcionales y nullish-coalescing

Los parámetros opcionales son aquellos que podemos obviar su envío cuando mandamos datos en una función que requiere argumentos.

El nullish-coalescing nos permite evaluar si una variable está definida, pero si esta es null o undefined, retorna un segundo valor diferente.

#### Parámetros opcionales en TypeScript

Para denotar que un parámetro será opcional usamos el operador ? al lado. Siempre debemos colocar los parámetros opcionales al final.

    const createProduct = (
        id: string | number, // Puede ser de tipo `string` o `number`.
        isNew: boolean,
        stock?: number, // PARÁMETRO OPCIONAL.
    ) => {
        return { // Retornamos un objeto con los valores pasados como parámetros.
            id,
            stock,
            isNew
        }
    }

    console.log(
        createProduct(1, true)
    ) // { id: 1, stock: undefined, isNew: true }

#### Valores por defecto con el operador OR

Para evitar tener como retorno valores undefined podríamos emplear el operador lógico || (OR) para asignar un valor por defecto.

    const createProduct = (
        id: string | number, // Puede ser de tipo `string` o `number`.
        isNew?: boolean,	// PARÁMETRO OPCINAL.
        stock?: number, // PARÁMETRO OPCINAL.
    ) => {
        return { // Retornamos un objeto con los valores pasados como parámetros.
            id,
            stock: stock || 10,
            isNew
        }
    }

    console.log(
        createProduct(1, true)
    ) // { id: 1, stock: undefined, isNew: true }

#### El problema de usar valores falsy en JavaScript

El operador || evalúa si el primer valor es falsy, de serlo retorna un segundo valor, si no es falsy retorna el primero. Los valores que son considerados falsy en JavaScript son:

- String vacío “”;
- Número 0;
- El valor booleano false;

Aquí surge un problema: si nosotros deseáramos mandar como argumento un valor que JavaScript considera falsy, entonces el operador || no tomará en cuenta nuestros valores y los cambiará por los de defecto:

    const createProduct = (
        id: string | number, // Puede ser de tipo `string` o `number`.
        isNew?: boolean,	// PARÁMETRO OPCINAL.
        stock?: number, // PARÁMETRO OPCINAL.
    ) => {
        return { // Retornamos un objeto con los valores pasados como parámetros.
            id,
            stock: stock || 10,
            isNew: isNew || true
        }
    }

    console.log(
        createProduct(1, false, 0)
    ) // { id: 1, stock: 10, isNew: true }
    // 👆 JavaScript retorna los valores por defecto de `isNew` y `stock`
    //		y no los que mandamos en los argumentos.

Este problema podemos solucionarlo con el nullish-coalescing.

#### Nullish-coalescing para asignar valores por defecto

El nullish-coalescing se representa con el operador ??. Esto evalúa si el primer valor está definido, si no lo está, retorna el segundo:

    const createProduct = (
        id: string | number, // Puede ser de tipo `string` o `number`.
        isNew?: boolean,	// PARÁMETRO OPCINAL.
        stock?: number, // PARÁMETRO OPCINAL.
    ) => {
        return { // Retornamos un objeto con los valores pasados como parámetros.
            id,
            stock: stock ?? 10,
            isNew: isNew ?? true
        }
    }

    console.log(
        createProduct(1, false, 0)
    ) // { id: 1, stock: 0, isNew: false }


## Parametros por defecto

Los parámetros por defecto se usan para predefinir valores a los parámetros de una función en caso de no especificar un valor al invocarla.

#### Parámetros por defecto en TypeScript

En TypeScript, usamos el signo = para definir el valor por defecto que cierto parámetro tendrá. Veamos un ejemplo:

    // Definición de función
    const createProduct = (
        id: string | number,
        isNew: boolean = true, // 👀
        stock: number = 10, // 👀
    ) => {
        return { // Retornamos un objeto con los valores pasados como parámetros.
            id,
            stock,
            isNew
        }
    }

    // Impresión en consola
    console.log(
        createProduct(1)
    ) // { id: 1, stock: 10, isNew: true } `stock` y `isNew` por defecto

    console.log(
        createProduct(2, false)
    ) // { id: 1, stock: 10, isNew: false } `stock` por defecto

    console.log(
        createProduct(3, false, 50)
    ) // { id: 1, stock: 50, isNew: false }

Podemos usar esto como alternativa al nullish-coalescing.


## Parametros Rest

En JavaScript, los parámetros rest nos permiten enviar la cantidad de parámetros que queramos a una función. Se denotan con ... seguido del nombre con el cual identificaremos a estos parámetros:

    // JavaScript function sum(...args){ //...args -> Parámetros rest const suma = args.reduce((acumulador, num) => acumulador + num, 0) return suma }

    console.log(sum(1,2)) // 5 console.log(sum(1,2,3,4,5)) // 15 console.log(sum(1,2,3,4,5,6,7,8,9,10)) // 55

#### Parámetros rest en TypeScript

En TypeScript, lo único que cambia es el tipado de los parámetros.

    // TypeScript function sum(...args: number[]){ //...args -> Parámetros rest const suma = args.reduce((acumulador, num) => acumulador + num, 0) return suma }

    console.log(sum(1,2)) // 5 console.log(sum(1,2,3,4,5)) // 15 console.log(sum(1,2,3,4,5,6,7,8,9,10)) // 55

El nombre de los parámetros rest pueden ser el que queramos: ...args, ...params, ...props, etc.


## Sobrecarga de funciones: el problema

Con la sobrecarga de funciones definimos diferentes firmas de una función en la que cada firma puede manejar cierto tipado de entrada y salida. TypeScript decidirá de manera automática qué firma es la correcta para usar basándose en los argumentos enviados y el tipo de datos de estos.

#### Un problema que puede resolver la sobrecarga de funciones

Imaginemos que deseamos implementar una función que devuelva un string en el caso de que le envíes un array o que devuelva un array en caso de que le mandes un string como argumento:

    // 1️⃣Si le enviamos un array, nos debe unir cada elemento del array y devolver un string.
    // 2️⃣Si le enviamos un string, nos debe separar cada caracter y formar un array como respuesta.
    // [N,i,c,o] => 'Nico' ... string[] => string 1️⃣
    //  'Nico' => [N,i,c,o] ... string => string[] 2️⃣


    function parseStr(input: string | string[]): string | string[] {
    if (Array.isArray(input)) {
        return input.join(''); // string
    } else {
        return input.split(''); // string[]
    }
    }

    // Llamando a la función...
    const rptaArray = parseStr('Nico'); // Entrada: string - Salida: Array
    console.log('rptaArray', 'Nico =>' ,rptaArray);

    const rptaStr = parseStr(['N','i','c','o']); // Entrada: array - Salida: string
    console.log('rptaStr', "['N','i','c','o'] =>",rptaStr); 


Definimos la función con un parámetro que puede ser del tipo string o string[] (un array que contiene valores de tipo string) y un retorno que puede ser de igual manera string o string[].

Cuando invocamos la función para enviar los argumentos que deseamos probar, TypeScript no sabe inicialmente qué tipo de dato le estás mandando de manera específica en el código. Por tanto, no podemos acceder en la siguiente línea de código a ningún método propio de un string o un array:

    const rptaArray = parseStr('Nico'); // Entrada: string - Salida: Array
    // La salida y por tanto el valor que es asignado a `rptaArray` será un Array.
    // Si intentamos aplicar un método propio de los Arrays:
    rptaArray.reverse(); // ⛔ ...Nos marcará error 👀

    const rptaStr = parseStr(['N','i','c','o']); // Entrada: array - Salida: string
    // La salida y por tanto el valor que es asignado a `rptaStr` será un string.
    // Si intentamos aplicar un método propio de los strings:
    rptaStr.toLowerCase(); // ⛔ ...Nos marcará error 👀

#### Solución con validación de tipos

Una posible solución es realizar una pequeña validación de tipos previo a querer ejecutar algún método propio del tipo de dato correspondiente:

    const rptaArray = parseStr('Nico');
    // rtaArray.reverse(); ⛔ NO directamente
    if (Array.isArray(rtaArray)) { //✅ Validación de tipos previamente...
    rtaArray.reverse(); // 👍 Ahora sí nos permite utilizar este método de los arrays.
    }
    console.log('rtaArray', 'Nico =>' ,rtaArray); // Vemos en consola


    const rtaStr = parseStr(['N','i','c','o']);
    // rtaStr.toLowerCase(); ⛔ NO directamente
    if (typeof rtaStr === 'string') { //✅ Validación de tipos previamente...
    rtaStr.toLowerCase(); // 👍 Ahora sí nos permite utilizar este método de los strings.
    }
    console.log('rtaStr', "['N','i','c','o'] =>",rtaStr); // Vemos en consola

## Solución con sobrecarga de funciones

Para resolver este problema con sobrecarga de funciones debemos declarar 2 firmas adicionales con el mismo nombre de la función: una firma manejará el tipado de entrada/salida como string/string[] y la otra forma de manera viceversa, es decir string[]/string. El parámetro de la función que tendrá la lógica puede manejar el tipado unknown, pues ya estamos dejando declarado previamente los tipados de entrada y salida que manejará la función:

    // SOBRECARGAS:
    function parseStr(input: string): string[]; // Entrada: string - Salida: string[]
    function parseStr(input: string[]): string; // Entrada: string[] - Salida: string

    // Función principal con las instrucciones deseadas y a la que se le aplicarán las sobrecargas:
    function parseStr(input: unknown): unknown {
    }

Ahora en la función principal haremos una validación de tipos y según ello retornaremos las respuestas respectivas a lo que se busca como output:

    // SOBRECARGAS:
    function parseStr(input: string): string[]; // Entrada: string - Salida: string[]
    function parseStr(input: string[]): string; // Entrada: string[] - Salida: string

    // Función principal y a la que se le aplicarán las sobrecargas:
    function parseStr(input: unknown): unknown {
        if (Array.isArray(input)) {
            return input.join(''); // string
        } else {
            return input.split(''); // string[]
        }
    }

Finalmente, ya podríamos utilizar los métodos según el tipo de dato de la respuesta obtenida de la función:

    // SOBRECARGAS:
    function parseStr(input: string): string[]; // Entrada: string - Salida: string[]
    function parseStr(input: string[]): string; // Entrada: string[] - Salida: string

    // Función principal y a la que se le aplicarán las sobrecargas:
    function parseStr(input: unknown): unknown {
        if (Array.isArray(input)) {
            return input.join(''); // string
        } else {
            return input.split(''); // string[]
        }
    }

    const rtaArray = parseStr('Nico'); // Salida: array
    rtaArray.reverse(); // ✅ Ya podemos acceder a los métodos de un array 
    console.log('rtaArray', 'Nico =>' ,rtaArray);

    const rtaStr = parseStr(['N','i','c','o']); // Salida: string
    rtaStr.toLowerCase(); // ✅ Ya podemos acceder a los métodos de un string 
    console.log('rtaStr', "['N','i','c','o'] =>",rtaStr);

## Interfaces 

Las interfaces nos permiten crear moldes de objetos con sus respectivas propiedades y tipado. Para generar interfaces usamos la palabra reservada interface.

    interface Product {
        id: number | string;
        title: string;
        price: number;
        stock: number;
    }

Si bien podemos hacerlo mismo con type:

    type Product = {
    id: number | string;
    title: string;
    price: number;
    stock: number;
    }

Existen algunas diferencias que hacen a interface una mejor opción para definir objetos.
Interfaces vs. Type

#### Veamos la diferencia entre usar interface y type:

Utilizamos type para definir principalmente tipos primitivos o directos (declaraciones cortas y puntuales), mientras que con una interface definimos una estructura llave-valor de propiedades que describan lo que debe tener un objeto.

    type Sizes = 'S' | 'M' | 'L' | 'XL';

    interface Product {
        id: number | string;
        title: string;
        price: number;
        stock: number;
        size?: Sizes;
    }

Los interface se pueden fácilmente extender (realizar herencia), mientras que con los type no. Esto los hace más escalables.


## Estructuras complejas

En TypeScript, puedes combinar los enums, types e interfaces de varias formas para crear estructuras de datos complejas y precisas.

#### Enums en interfaces

Podríamos asociar el tipado de una de las propiedades de un interface con un enum:

    enum Color {
    Negro,
    Blanco,
    Morado
    }

    interface FiguraGeometrica {
    nombre: string;
    color: Color;
    }

    const rectangulo: FiguraGeometrica = {
    nombre: "rectángulo",
    color: Color.Morado
    };

#### Types en Interfaces

En los atributos de un interface podríamos usar un type para dar un tipado customizable:

    type Coordenadas = [number, number];

    interface Punto {
    ubicacion: Coordenadas;
    etiqueta: string;
    }

    const punto: Punto = {
    ubicacion: [10, 5],
    etiqueta: "Punto A"
    };

#### Combinación de Enums y Types

En TypeScript, también es posible juntar los enums y types. Por ejemplo, podemos declarar un type que tenga la estructura de objeto en el que una de sus propiedades es un valor del set de opciones perteneciente a un enum:

    enum Size {
    Chico = "S",
    Mediano = "M",
    Grande = "L"
    }

    type Producto = {
    name: string;
    size: Size; // 👈 Enum
    };

    const camiseta: Producto = {
    name: "Camiseta",
    size: Size.Mediano
    };

#### Interfaces, enums y types juntos

Es posible usar enums y types dentro de un interface para crear una sola estructura compleja para poder generar objetos con información más detallada y precisa:

    enum TipoVehiculo {
    Automóvil,
    Motocicleta
    }

    type Especificaciones = {
    marca: string;
    modelo: string;
    año: number;
    };

    interface Vehiculo {
    tipo: TipoVehiculo; // 👈 Enum
    especificaciones: Especificaciones; // 👈 Type
    }

    // Objeto
    const vehiculo: Vehiculo = {
    tipo: TipoVehiculo.Automóvil,
    especificaciones: {
        marca: "Toyota",
        modelo: "Corolla",
        año: 2020
    }
    };

Al combinar estas estructuras, tienes la capacidad de producir estructuras de datos más complejas y establecer tipos más detallados para tus objetos y variables. Esto da como resultado un código más claro, seguro y fácil de mantener.


## Extender interfaces

En TypeScript, la herencia en interfaces permite crear una interfaz nueva basada en otra interfaz existente, heredando sus propiedades y métodos.

#### Herencia de interfaces en TypeScript

Utilizamos la palabra clave extends para aplicar la herencia en interfaces. Veamos un ejemplo:

    interface Animal {
    nombre: string;
    comer(): void;
    }

    interface Mascota extends Animal { // 👈 Herencia de interfaces
    // Hereda la propiedad `nombre` y el método `comer()` de la interfaz `Animal`
    jugar(): void;
    }

    class Perro implements Mascota {
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    comer() {
        console.log(this.nombre + " está comiendo.");
    }

    jugar() {
        console.log(this.nombre + " está jugando.");
    }
    }

    const miPerro = new Perro("Firulais");
    miPerro.comer(); // "Firulais está comiendo."
    miPerro.jugar(); // "Firulais está jugando."

En el ejemplo, declaramos una interface llamada Animal con un atributo nombre y un método comer(). Después, implementamos otra llamada Mascota que extiende la interfaz Animal y agrega un nuevo método con el nombre jugar(). La clase Perro implementa la interfaz Mascota, por lo que no solo debe implementar el método jugar(), sino también el atributo nombre y el método comer() que fueron heredados de la interfaz Animal en la interfaz Mascota.


## Propiedades de solo lectura


Las propiedades de solo lectura son atributos de un objeto que solo pueden ser asignadas durante la creación del mismo y no pueden ser cambiados después. Esto asegura que el valor de la propiedad se mantenga constante y no pueda ser cambiado de forma accidental o intencional.

#### Readonly en TypeScript

En TypeScript, las propiedades de solo lectura las declaramos con la palabra clave readonly. Veamos un ejemplo:

    class Persona {
        // SOLO LECTURA 👀
    readonly nombre: string;
    readonly edad: number;
        // ---

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
    }
    }

    const persona = new Persona("Freddy", 35);
    persona.saludar(); // ✅"Hola, mi nombre es Freddy y tengo 35 años."

    persona.nombre = "Pepe"; // ⛔Error: La propiedad 'nombre' solo se puede leer
    persona.edad = 42; // ⛔Error: La propiedad 'edad' solo se puede leer
