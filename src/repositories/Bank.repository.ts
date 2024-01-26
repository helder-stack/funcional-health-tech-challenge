// repositories/bankRepository.ts
import { PrismaClient } from "@prisma/client";
import { IBankRepository } from "../interfaces/IBank.repository";
import { BankDTO } from "../dtos/bank/Bank.dto";

export class BankRepository implements IBankRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllBanks() {
    return this.prisma.bank.findMany();
  }

  async getBankById(id: string) {
    return this.prisma.bank.findUnique({ where: { id } });
  }

  async createBank(data: BankDTO) {
    return this.prisma.bank.create({ data });
  }

  async updateBank(id: string, data: BankDTO) {
    return this.prisma.bank.update({ where: { id }, data });
  }

  async deleteBank(id: string) {
    await this.prisma.bank.delete({ where: { id } });
  }

  async getByName(name: string){
    return this.prisma.bank.findFirst({where: {name}})
  }
}