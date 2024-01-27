import { IAccountRepository } from "../interfaces/IAccount.repository";
import { IBankRepository } from "../interfaces/IBank.repository";
import { IUserRepository } from "../interfaces/IUser.repository";
import { UserRepository } from "../repositories/User.repository";

export class AccountService {
    
    private repository: IAccountRepository
    private userRepository: IUserRepository
    private bankRepository: IBankRepository

    constructor(
        repository: IAccountRepository,
        userRepository: IUserRepository,
        bankRepository: IBankRepository

    ){
        this.repository = repository
        this.userRepository = userRepository
        this.bankRepository = bankRepository
    }

    async create(userId: string, bankId: string){
        const user = await this.userRepository.getUserById(userId)
        if(user){
            const bank = await this.bankRepository.getBankById(bankId)
            if(bank){
                const account = await this.repository.createAccount({
                    bankId,
                    userId,
                    number: Math.floor(Math.random()*99999).toString()
                })
                return {
                    conta: account.number,
                    saldo: account.balance
                }
            }else{
                throw new Error("O banco não existe")
            }
        }else{
            throw new Error("O usuário não existe")
        }
    }

    async getAccounts(){
        const accounts = await this.repository.getAllAccounts();
        return accounts.map(account => {
            return {
                conta: account.number,
                saldo: account.balance
            }
        })
    }
}