![](https://camo.githubusercontent.com/844148652b79f17069094433ed1e934bf7ae9969e44df8c18442023d65796d24/687474703a2f2f7777772e66756e63696f6e616c61636573736f2e636f6d2f496d616765732f4c6f676f2d46756e63696f6e616c4865616c7468546563682e706e67)

# Teste desenvolvedor Node.js - Funcional Health Tech

Olá, time de tech da Funcional Health Tech! Aqui lhes apresento o desafio proposto para o processo seletivo. Além das operações que foram citadas (sacar, depositar e consultar), tomei a liberdade de adicionar mais um método chamado pagarConta, que lhes permitirá pagar uma conta caso seu saldo seja o suficiente. 
Realizei o projeto com graphQl e para persistir os dados criei um banco de dados PostgreSQL.

# Atenção

Antes de rodar o projeto, não esqueça de criar e incluir as informações necessárias no .env.

AO SE INICIAR O PROJETO É CRIADO UM USUÁRIO AUTOMATICAMENTE PARA UTILIZAR A CONTA. 

## COMO RODAR NO NODE

```bash
$ yarn 
$ yarn prisma migrate dev
$ yarn dev
```

## COMO RODAR COM O DOCKER

Tomei a liberdade de criar um docker compose para subir o projeto automaticamente (banco de dados e o software)

```bash
$ docker compose up
```
## PARA RODAR OS TESTES
```bash
$ yarn test --coverage
```

## PARA ACESSAR

Assim que o projeto for iniciado e as configurações forem concluídas, será possível ver no terminal a conta criada para o projeto. Mas lhes adianto as informações para realizar as operações:

- Conta: 54321
- Saldo: R$300


Como proposto e recomendado no desafio, realizei a criação do sistema com o graphql.
Para acessá-lo, basta ir na url: http://localhost:<porta que criou no .env>/graphql

## Alguns exemplos de mutation e query

```bash
mutation{
  pagarDivida(conta: 54321, valorDivida: 100){
    conta,
    saldo
  }
}
```
```bash
mutation{
  sacar(conta: 54321, valor: 1){
    conta
    saldo
  }
}
```
```bash
mutation{
  depositar(conta: 54321, valor: 500){
    conta,
    saldo
  }
}
```
```bash
query {
  saldo(conta: 54321){
    conta,
    saldo
  }
}

```
(este ultimo fiz para poder pegar as contas disponíveis)

```bash
query {
  contaExemplo{
    conta,
    saldo
  }
}

```


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
