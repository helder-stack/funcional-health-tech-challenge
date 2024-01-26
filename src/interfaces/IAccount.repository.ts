import { Account } from "@prisma/client";
import { AccountDTO } from "../dtos/account/Account.dto";

export interface IAccountRepository {
  getAllAccounts(): Promise<Account[]>;
  getAccountById(id: string): Promise<Account | null>;
  createAccount(data: AccountDTO): Promise<Account>;
  updateAccount(id: string, data: AccountDTO): Promise<Account>;
  deleteAccount(id: string): Promise<void>;
  getAccountByUserAndBankId(userId: string, bankId: string): Promise<Account | null>;
  getByAccountNumber(account: string): Promise<Account | null>
}
