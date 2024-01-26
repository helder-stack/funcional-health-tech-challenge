// repositories/accountRepository.ts
import { PrismaClient } from "@prisma/client";
import { IAccountRepository } from "../interfaces/IAccount.repository";
import { AccountDTO } from "../dtos/account/Account.dto";

export class AccountRepository implements IAccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllAccounts() {
    return this.prisma.account.findMany();
  }

  async getAccountById(id: string) {
    return this.prisma.account.findUnique({ where: { id } });
  }

  async createAccount(data: AccountDTO) {
    return this.prisma.account.create({ data });
  }

  async updateAccount(id: string, data: AccountDTO) {
    return this.prisma.account.update({ where: { id }, data });
  }

  async deleteAccount(id: string) {
    await this.prisma.account.delete({ where: { id } });
  }

  async getAccountByUserAndBankId(userId: string, bankId: string){
    return this.prisma.account.findFirst({
        where: {
            userId,
            bankId
        }
    })
  }

  getByAccountNumber(account: string){
    return this.prisma.account.findFirst({
      where: {
        number: account
      }
    })
  }

}