import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUser.repository";
import { UserDTO } from "../dtos/user/User.dto";

export class UserRepository implements IUserRepository {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    async getUserById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async createUser(data: UserDTO) {
        return this.prisma.user.create({ data });
    }

    async updateUser(id: string, data: UserDTO) {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: string) {
        await this.prisma.user.delete({ where: { id } });
    }

    async getByEmail(email: string){
        return this.prisma.user.findFirst({where: {email}})
    }
}
