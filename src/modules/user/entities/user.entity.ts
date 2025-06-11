import { UserRole } from "@prisma/client";

export class User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
