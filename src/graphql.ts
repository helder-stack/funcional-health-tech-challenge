import { buildSchema } from 'graphql';
import { BankTransactions } from './services/BankTransactions.service';
import { AccountRepository } from './repositories/Account.repository';

export const schema = buildSchema(`
  type User {
    name: String!
    email: String!
  }

  type Bank {
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Account {
    conta: String!
    saldo: Float!
  }

  type Mutation {
    sacar(conta: Int!, valor: Float): Account
    depositar(conta: Int!, valor: Float): Account
    pagarDivida(conta: Int!, valorDivida: Float!): Account
  }
  
  type Query {
    saldo(conta: Int!): Account
    contaExemplo: [Account]
  }
`);

const service = new BankTransactions(
  new AccountRepository()
)

export const root = {
  sacar: ({ conta, valor }) => service.withdraw(conta, valor),
  depositar: ({ conta, valor }) => service.deposit(conta, valor),
  saldo: ({ conta }) => service.checkBalance(conta),
  contaExemplo: () => service.getExampleAccounts(),
  pagarDivida: ({ conta, valorDivida }) => service.payBill(conta, valorDivida)
};
