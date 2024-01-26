import { randomUUID } from "crypto";
import { BankTransactions } from "../../src/services/BankTransactions.service";
import { AccountRepository } from "../../src/repositories/Account.repository";
import { mock, MockProxy } from "jest-mock-extended"

describe("Bank transactions service", () => {

    let accountRepository: MockProxy<AccountRepository>;
    let service: BankTransactions;

    beforeEach(() => {
        accountRepository = mock<AccountRepository>();
        service = new BankTransactions(
            accountRepository
        )
    });


    const accountMock = {
        id: randomUUID(),
        number: "65432",
        balance: 100.00,
        userId: "b08bc94a-3aeb-48c2-9876-de682fa561f1",
        bankId: "4b43be71-f4e3-401e-b27f-fb59c3583ffa",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
    }

    test("Should to test withdraw correctly", async () => {
        accountRepository.getByAccountNumber.mockResolvedValue(accountMock)
        accountRepository.updateAccount.mockResolvedValue({
            ...accountMock,
            balance: accountMock.balance - 10
        })

        expect(service.withdraw("65432", 10)).resolves.toEqual({
            conta: accountMock.number,
            saldo: accountMock.balance - 10
        })
    })

    test("Should to test exception if user doesn't exists", async () => {
        expect(service.withdraw("65432", 10)).rejects.toThrow(
            new Error("Conta não encontrada")
        )
        expect(service.deposit("65432", 10)).rejects.toThrow(
            new Error("Conta não encontrada")
        )
        expect(service.checkBalance("65432")).rejects.toThrow(
            new Error("Conta não encontrada")
        )
        expect(service.payBill("65432", 10)).rejects.toThrow(
            new Error("Conta não encontrada")
        )
    })

    test("should throw an error when the balance is not enough", async () => {
        accountRepository.getByAccountNumber.mockResolvedValue({
            ...accountMock,
            balance: 5
        })
        expect(service.withdraw("65432", 10)).rejects.toThrow(
            new Error("Saldo insuficiente")
        )
    })

    it("Should to test deposit in balance", async () => {
        accountRepository.getByAccountNumber.mockResolvedValue(accountMock)
        accountRepository.updateAccount.mockResolvedValue({
            ...accountMock,
            balance: accountMock.balance + 10
        })
        expect(service.withdraw("65432", 10)).resolves.toEqual({
            conta: accountMock.number,
            saldo: accountMock.balance + 10
        })
    })

    it("Should to test check balance", async ()=>{
        accountRepository.getByAccountNumber.mockResolvedValue(accountMock)

        expect(service.checkBalance("65432")).resolves.toEqual({
            conta: accountMock.number,
            saldo: accountMock.balance
        })
    })

    it("Should to test get exemplesAccount", async ()=>{
        accountRepository.getAllAccounts.mockResolvedValue([accountMock])
        expect(service.getExampleAccounts()).resolves.toEqual([
            {
                conta: accountMock.number,
                saldo: accountMock.balance
            }
        ])
    })

    it("Should to pay bill", async ()=>{
        accountRepository.getByAccountNumber.mockResolvedValue(accountMock)
        accountRepository.updateAccount.mockResolvedValue({
            ...accountMock,
            balance: accountMock.balance - 10
        })

        expect(service.payBill("65432", 10)).resolves.toEqual({
            conta: accountMock.number,
            saldo: accountMock.balance-10
        })
    })

    it("should to treat error if balance is not enough", async ()=>{
        accountRepository.getByAccountNumber.mockResolvedValue({
            ...accountMock,
            balance: 1
        })
        expect(service.payBill("65432", 10)).rejects.toThrow(
            new Error("Saldo insuficiente")
        )

    })

})