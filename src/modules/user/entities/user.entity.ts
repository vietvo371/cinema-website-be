import { UserRole } from '@prisma/client';

export class User {
    id: bigint;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role: UserRole;
    status: string;
    refreshToken?: string;
    isActive?: Date;
    hashActive?: string;
    hashForget?: string;
    createdAt: Date;
    updatedAt: Date;
}
