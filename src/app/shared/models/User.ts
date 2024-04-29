export interface User {
    email: string;
    password: string;
    name: {
        firstName: string;
        lastName: string;
    }
}