import { Bank } from "@prisma/client"
import { BankDTO } from "../dtos/bank/Bank.dto"

export interface IBankRepository {
    getAllBanks(): Promise<Bank[]>
    getBankById(id: string): Promise<Bank | null>
    createBank(data: BankDTO): Promise<Bank>
    updateBank(id: string, data: BankDTO): Promise<Bank>
    deleteBank(id: string): Promise<void>
    getByName(name: string): Promise<Bank | null>
}