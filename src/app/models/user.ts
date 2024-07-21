import { Role } from "./role";

export class User {
    id!: string;
    username!: string;
    userRoles!: Role;
    token?: string;
}