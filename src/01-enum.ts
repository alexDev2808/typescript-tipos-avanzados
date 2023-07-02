

enum ROLES { 
    ADMIN = "admin",
    SELLER = "seller",
    CUSTOMER = "customer",
}

type User = {
    username: string,
    roles: ROLES
}

const alexUser: User = {
    username: "alexdev2808",
    roles: ROLES.ADMIN
}