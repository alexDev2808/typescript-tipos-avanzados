import { User, ROLES } from "./01-enum";

const currentUser: User = {
    username: 'alexdev',
    roles: ROLES.CUSTOMER,
}

export const checkAdminRole = () => {
    if(currentUser.roles === ROLES.ADMIN) {
        return true;
    }

    return false;
}

console.log(checkAdminRole());


export const checkRole = (...roles: string[]) => {
    if(roles.includes(currentUser.roles)) {
        return true;
    }

    return false;
}

const respuesta = checkRole(ROLES.ADMIN, ROLES.SELLER, ROLES.CUSTOMER);
console.log(`Comprobar role: ${respuesta}`);
