# 05: REST API
[neon.tech](https://neon.tech/) : website for online database storage

[prisma](https://www.prisma.io/docs): Prisma is a powerful application development tool and ORM (Object-Relational Mapping)

[prisma-schema/data-model](https://www.prisma.io/docs/orm/prisma-schema/data-model)
## 1. Setup-prisma
You should install the extension `Prisma`  for VS Code 

Because prisma is added to existing project and the project uses Nest(Typescript) vs PostgreSQL 

=> https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql)
```bash
$ npm i prisma -D

$ npx prisma init
```
## 2. Connection `neon.tech`
- Register a account on `neon.tech` and login.

- Create databases and tables on the account.

- Visit Dashboard -> Connection Details -> Change `Connection string` to `Prisma` -> Copy content in 2 files `Schema.prisma` and `.env` 

## 3. Data model
