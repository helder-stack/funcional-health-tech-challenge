import { MockProxy, mock } from "jest-mock-extended";
import { AccountRepository } from "../../src/repositories/Account.repository";
import { AccountService } from "../../src/services/Accout.service";
import { BankRepository } from "../../src/repositories/Bank.repository";
import { UserRepository } from "../../src/repositories/User.repository";
import { randomUUID } from "crypto";

describe("Test account service", () => {
    let accountRepository: MockProxy<AccountRepository>;
    let userRepository: MockProxy<UserRepository>;
    let bankRepository: MockProxy<BankRepository>;

    let service: AccountService;

    beforeEach(() => {
        accountRepository = mock<AccountRepository>();
        userRepository = mock<UserRepository>();
        bankRepository = mock<BankRepository>();
        service = new AccountService(
            accountRepository,
            userRepository,
            bankRepository
        )
    });

    const userMock = {
        id: randomUUID(),
        name: "Hélder",
        email: "helderfac450@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const bankMock = {
        id: randomUUID(),
        name: "Banco teste",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const accountMock = {
        id: randomUUID(),
        number: "65432",
        balance: 0,
        userId: userMock.id,
        bankId: bankMock.id,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }

    test("Should create account", () => {
        userRepository.getUserById.mockResolvedValue(userMock)
        bankRepository.getBankById.mockResolvedValue(bankMock)
        accountRepository.createAccount.mockResolvedValue(accountMock)

        expect(service.create(userMock.id, bankMock.id)).resolves.toEqual({
            conta: accountMock.number,
            saldo: accountMock.balance
        })
    })

    test("Should throw when not find user", async () => {
        expect(service.create(userMock.id, bankMock.id)).rejects.toThrow(
            new Error("O usuário não existe")
        )
    })

    test("Should throw when not find user", async () => {
        userRepository.getUserById.mockResolvedValue(userMock)
        expect(service.create(userMock.id, bankMock.id)).rejects.toThrow(
            new Error("O banco não existe")
        )
    })

    test("Should return array of account", async ()=>{
        accountRepository.getAllAccounts.mockResolvedValue([accountMock])
        expect(service.getAccounts()).resolves.toEqual([
            {
                conta: accountMock.number,
                saldo: accountMock.balance
            }
        ])
    })

})