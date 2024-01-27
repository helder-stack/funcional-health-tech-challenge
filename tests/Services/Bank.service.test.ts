import { MockProxy, mock } from "jest-mock-extended";
import { BankRepository } from "../../src/repositories/Bank.repository";
import { BankService } from "../../src/services/Bank.service";
import { randomUUID } from "node:crypto";

describe("Test bank service", ()=>{
    let bankRepository: MockProxy<BankRepository>;
    let service: BankService;

    beforeEach(() => {
        bankRepository = mock<BankRepository>();
        service = new BankService(
            bankRepository
        )
    });

    const bankMock = {
        id: randomUUID(),
        name: "Banco teste",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    it("Should return array of bank", async ()=>{
        bankRepository.getAllBanks.mockResolvedValue([
            bankMock
        ])
        expect(service.getBanks()).resolves.toEqual([
            {
                id: bankMock.id,
                nome: bankMock.name
            }
        ])
    })
})