import { MockProxy, mock } from "jest-mock-extended";
import { UserRepository } from "../../src/repositories/User.repository";
import { UserService } from "../../src/services/User.service";
import { randomUUID } from "crypto";

describe("Test user service", ()=>{
    let userRepository: MockProxy<UserRepository>;
    let service: UserService;

    beforeEach(() => {
        userRepository = mock<UserRepository>();
        service = new UserService(
            userRepository
        )
    });

    const userMock = {
        id: randomUUID(),
        name: "Hélder",
        email: "helderfac450@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    test("Should create user", ()=>{
        userRepository.createUser.mockResolvedValue(userMock)
        expect(service.create("Hélder", "helderfac450@gmail.com")).resolves.toEqual({
            id: userMock.id,
            nome: "Hélder",
            email: "helderfac450@gmail.com"
        })
    })

    test("Should be able to treat error to create an user with existent e-mail", ()=>{
        userRepository.getByEmail.mockResolvedValue(userMock)
        expect(service.create("Hélder", "helderfac450@gmail.com")).rejects.toThrow(
            new Error("O e-mail já está sendo utilizado")
        )
    })

    test("Should return users", ()=>{
        userRepository.getAllUsers.mockResolvedValue([userMock])
        expect(service.getUsers()).resolves.toEqual([
            {
                id: userMock.id,
                nome: userMock.name,
                email: userMock.email
            }
        ])

    })

})