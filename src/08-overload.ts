
// funciona con function
function parseStr(input: string | string[]) : string | string[] {
    if ( Array.isArray(input) ) {
        return input.join(""); //string
    } else {
        return input.split(""); // string[]
    }
}

// Typescrip no sabe que tipo de dato es ya que hay dos posibles resultados: string | string[]
const rtaArray = parseStr("Alexis");
console.log(rtaArray);


const rtaStr = parseStr(['A', 'L', 'E', 'X']);
console.log(rtaStr);

