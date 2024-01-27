import { IUserRepository } from "../interfaces/IUser.repository";

export class UserService {
    
    private repository: IUserRepository

    constructor(repository: IUserRepository){
        this.repository = repository
    }

    async create(name: string, email: string){
        const user = await this.repository.getByEmail(email)
        if(!user){
            const createdUser = await this.repository.createUser({name, email})
            return {
                id: createdUser.id,
                nome: createdUser.name,
                email: createdUser.email
            }
        }else{
            throw new Error("O e-mail já está sendo utilizado")
        }
    }

    async getUsers(){
        const users = await this.repository.getAllUsers();
        return users.map(user => {
            return {
                id: user.id,
                nome: user.name,
                email: user.email
            }
        })
    }
}