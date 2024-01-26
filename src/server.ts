
import express from 'express'

import { enviroments } from './Envs';
import { config } from 'dotenv';
import { seed } from '../prisma/seed';
import { graphqlHTTP } from 'express-graphql';
import { root, schema } from './graphql';

config();

const app = express();
const envs = enviroments();

app.use(express.json())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, 
  })
);

app.listen(envs.port, async () => {
    console.clear();
    await seed()
    console.log(`Foi criado uma conta para teste:\n\n- Número da conta: 54321 \n- Saldo: R$ 300.00`)
    console.log(`\n\nAccesse o painel do graphql através da url: http://localhost:${envs.port}/graphql`)
    console.log(`\n🚀 O servidor está rodando na porta ${envs.port} 🚀`)
  });