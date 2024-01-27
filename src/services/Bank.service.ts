import { IBankRepository } from "../interfaces/IBank.repository";

export class BankService {
    
    private repository: IBankRepository


    constructor(repository: IBankRepository){
        this.repository = repository
    }

    async getBanks(){
        const banks = await this.repository.getAllBanks();
        return banks.map(bank => {
            return {
                id: bank.id,
                nome: bank.name
            }
        })
    }
}