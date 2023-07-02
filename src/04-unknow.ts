let anyVar: any;

anyVar = true;
anyVar = "Aleatorio";
anyVar = null;

let unknowVar : unknown;

unknowVar = true;
unknowVar = "Aleatorio";
unknowVar = null;

if(typeof unknowVar === 'string') {
    unknowVar.toUpperCase();
}

if(typeof unknowVar === 'boolean') {
    let isNew : boolean = unknowVar;
}

const parse = (str: string) : unknown => {
    return JSON.parse(str);
}

