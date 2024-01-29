import { AccountRepository } from "../src/repositories/Account.repository";
import { BankRepository } from "../src/repositories/Bank.repository";
import { UserRepository } from "../src/repositories/User.repository";


const bankRepository = new BankRepository()
const userRepository = new UserRepository()
const accountRepository = new AccountRepository()

async function seedBank() {
    const bank = await bankRepository.getByName("FHT Bank");
    if (!bank) {
        console.log("*** SEEDING BANK ***\n")
        bankRepository.createBank({ name: "FHT Bank" })
    }
}

async function seedUser() {
    const user = await userRepository.getByEmail("dev@funcional.com")
    if (!user) {
        console.log("*** SEEDING USER ***\n")
        await userRepository.createUser({
            name: "FHT USER",
            email: "dev@funcional.com"
        })
    }
}

async function seedAccount() {
    const user = await userRepository.getByEmail("dev@funcional.com")
    const bank = await bankRepository.getByName("FHT Bank");
    if(user){
        const account = await accountRepository.getAccountByUserAndBankId(user.id, bank.id)
        if (!account) {
            console.log("*** SEEDING ACCOUNT ***\n")
            return await accountRepository.createAccount({
                bankId: bank.id,
                userId: user.id,
                number: "54321",
                balance: 300
            })
        }
        return account
    }else{
        await seedUser()
        return await seedAccount()
    }
}

export async function seed() {
    await seedBank()
    await seedUser()
    await seedAccount();
}