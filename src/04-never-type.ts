const sinFinal = () => {
    while(true) {
        console.log("#Nunca Pares de Aprender.");
    }
}

const fail = (message: string) => {
    throw new Error(message)
}

const ejemplo = (input: unknown) => {
    if(typeof input === 'string') {
        return "Es un string"
    } else if (Array.isArray(input)) {
        return "Es un Array"
    } else {
        return fail("No hay coincidencias");
    }
}

console.log(ejemplo('Alexis'));
console.log(ejemplo([46,2,4,"Alexis"]));
console.log(ejemplo(43464));

console.log("Esto ya no se ejecuta, porque el programa termina antes");

