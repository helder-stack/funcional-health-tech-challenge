import { User } from "@prisma/client"
import { UserDTO } from "../dtos/user/User.dto"

export interface IUserRepository {
    getAllUsers(): Promise<User[]>
    getUserById(id: string): Promise<User | null>
    createUser(data: UserDTO): Promise<User>
    updateUser(id: string, data: UserDTO): Promise<User>
    deleteUser(id: string): Promise<void>
    getByEmail(email: string): Promise<User | null>
}