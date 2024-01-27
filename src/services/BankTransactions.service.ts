import { IAccountRepository } from "../interfaces/IAccount.repository";

export class BankTransactions {

    private accountRepository: IAccountRepository;

    constructor(accountRepository: IAccountRepository) {
        this.accountRepository = accountRepository;
    }

    async withdraw(accountNumber: string | number, value: number) {
        const account = await this.accountRepository.getByAccountNumber(accountNumber.toString())
        if (account) {
            if (account.balance >= value) {
                const updatedAccount = await this.accountRepository.updateAccount(account.id, {
                    ...account,
                    balance: account.balance - value
                })
                return {
                    conta: accountNumber,
                    saldo: updatedAccount.balance
                }
            } else {
                throw new Error("Saldo insuficiente")
            }
        } else {
            throw new Error("Conta não encontrada")
        }
    }

    async deposit(accountNumber: string | number, value: number) {
        const account = await this.accountRepository.getByAccountNumber(accountNumber.toString())
        if (account) {
            const updatedAccount = await this.accountRepository.updateAccount(account.id, {
                ...account,
                balance: account.balance + value
            })
            return {
                conta: accountNumber,
                saldo: updatedAccount.balance
            }
        } else {
            throw new Error("Conta não encontrada")
        }
    }

    async checkBalance(accountNumber: string | number) {
        const account = await this.accountRepository.getByAccountNumber(accountNumber.toString())
        if (account) {
            return {
                conta: accountNumber,
                saldo: account.balance
            }
        } else {
            throw new Error("Conta não encontrada")
        }
    }

    async payBill(accountNumber: string | number, billValue: number) {
        const account = await this.accountRepository.getByAccountNumber(accountNumber.toString())
        if (account) {
            if(account.balance >= billValue){
                const updatedAccount = await this.accountRepository.updateAccount(account.id, {
                    ...account,
                    balance: account.balance - billValue
                })
                return {
                    conta: accountNumber,
                    saldo: updatedAccount.balance
                }
            }else{
                throw new Error("Saldo insuficiente")
            }
        } else {
            throw new Error("Conta não encontrada")
        }
    }
}