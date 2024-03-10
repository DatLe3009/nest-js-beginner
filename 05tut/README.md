# 05: REST API
[neon.tech](https://neon.tech/) : website for online database storage

[prisma](https://www.prisma.io/docs): Prisma is a powerful application development tool and ORM (Object-Relational Mapping)

[setup-prisma](https://www.prisma.io/docs/getting-started/setup-prisma)

[prisma-schema/data-model](https://www.prisma.io/docs/orm/prisma-schema/data-model)

[prisma-migrate](https://www.prisma.io/docs/orm/prisma-migrate)
## 1. Setup-prisma
- You should install the extension `Prisma`  for VS Code 

- Because prisma is added to existing project and the project uses Nest(Typescript) vs PostgreSQL, 

[setup-prisma](https://www.prisma.io/docs/getting-started/setup-prisma) => add-to-existing-project => relational-databases-typescript-postgresql
```bash
$ npm i prisma -D

$ npx prisma init
```
## 2. Connection `neon.tech`
- Register a account on `neon.tech` and login.

- Create databases and tables on the account.

- Visit Dashboard -> Connection Details -> Change `Connection string` to `Prisma` -> Copy content in 2 files `Schema.prisma` and `.env` 

## 3. PRISMA SCHEMA/ Data model
`schema.prisma`
```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Employee {
  id        Int      @id @default(autoincrement())
  name      String   @unique   // will delete @unique 
  email     String   @unique
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  INTERN
  ENGINEER
  ADMIN
}
```
## 4. PRISMA MIGRATE
### B1
```bash
$ npx prisma migrate dev --name init
```
### B2 : [prisma-cli-reference#generate](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#generate)
```bash
$ npx prisma generate                            
```
### B3 : Delete `@unique` of Employee.name and migrate again, aim to watch the change of `migration.sql`
```bash
$ npx prisma migrate dev --name name_change 
```
