import { buildSchema } from 'graphql';
import { BankTransactions } from './services/BankTransactions.service';
import { AccountRepository } from './repositories/Account.repository';
import { UserService } from './services/User.service';
import { UserRepository } from './repositories/User.repository';
import { AccountService } from './services/Accout.service';
import { BankRepository } from './repositories/Bank.repository';
import { BankService } from './services/Bank.service';

export const schema = buildSchema(`
  type User {
    id: ID!
    nome: String!
    email: String!
  }

  type Bank {
    id: ID!
    nome: String!
  }

  type Account {
    conta: String!
    saldo: Float!
  }

  type Mutation {
    sacar(conta: Int!, valor: Float): Account
    depositar(conta: Int!, valor: Float): Account
    pagarDivida(conta: Int!, valorDivida: Float!): Account
    criarUsuario(nome: String!, email: String!): User
    criarConta(idUsuario: String!, idBanco: String!): Account
  }
  
  type Query {
    saldo(conta: Int!): Account
    contaExemplo: [Account]
    buscaUsuarios: [User]
    buscaBancos: [Bank]
  }
`);

const bankTransactionsService = new BankTransactions(
  new AccountRepository()
)

const userService = new UserService(
  new UserRepository()
)

const accountService = new AccountService(
  new AccountRepository(),
  new UserRepository(),
  new BankRepository()
)

const bankService = new BankService(
  new BankRepository()
)

export const root = {
  sacar: ({ conta, valor }) => bankTransactionsService.withdraw(conta, valor),
  depositar: ({ conta, valor }) => bankTransactionsService.deposit(conta, valor),
  saldo: ({ conta }) => bankTransactionsService.checkBalance(conta),
  contaExemplo: () => accountService.getAccounts(),
  pagarDivida: ({ conta, valorDivida }) => bankTransactionsService.payBill(conta, valorDivida),
  criarUsuario: ({nome, email}) => userService.create(nome, email),
  buscaUsuarios: () => userService.getUsers(),
  criarConta: ({idUsuario, idBanco}) => accountService.create(idUsuario, idBanco),
  buscaBancos: () => bankService.getBanks()
};
