
export function parseStr(input: string): string[];
export function parseStr(input: string[]): string;
export function parseStr(input: number): boolean;

// funciona con function
export function parseStr(input: unknown) : unknown {
    if ( Array.isArray(input) ) {
        return input.join(""); //string
    } else if ( typeof input === 'string') {
        return input.split(""); // string[]
    } else if ( typeof input === 'number') {
        return true; // boolean
    }
}

// Typescrip no sabe que tipo de dato es ya que hay dos posibles resultados: string | string[]
const rtaArray = parseStr("Alexis");
rtaArray.reverse();
console.log(rtaArray);


const rtaStr = parseStr(['A', 'L', 'E', 'X']);
console.log(rtaStr.toLowerCase());

const rtaBoolean = parseStr(22);
console.log(rtaBoolean);
