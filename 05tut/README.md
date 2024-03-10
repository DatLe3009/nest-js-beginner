# 05: REST API
[neon.tech](https://neon.tech/) : website for online database storage

[prisma](https://www.prisma.io/docs): Prisma is a powerful application development tool and ORM (Object-Relational Mapping)

[setup-prisma](https://www.prisma.io/docs/getting-started/setup-prisma)

[prisma-schema/data-model](https://www.prisma.io/docs/orm/prisma-schema/data-model)

[Install and generate Prisma Client](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgresql)

[prisma-cli-reference#generate](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#generate)

[prisma-migrate](https://www.prisma.io/docs/orm/prisma-migrate)

[lifecycle-events](https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events-1)

[crud-generator](https://docs.nestjs.com/recipes/crud-generator)
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
[prisma-schema/data-model](https://www.prisma.io/docs/orm/prisma-schema/data-model)

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
## 4. Install and generate Prisma Client
[Install and generate Prisma Client](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgresql)

[prisma-cli-reference#generate](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#generate)
```bash
$ npm i @prisma/client          

$ npx prisma generate           // Installs the @prisma/client into the npm project if it is not already present.                
```
## 5. PRISMA MIGRATE
[prisma-migrate](https://www.prisma.io/docs/orm/prisma-migrate)
- Create the first migration
```bash
$ npx prisma migrate dev --name init
```
- Change fields to your schema: Delete `@unique` of Employee.name
- Create the second migration
```bash
$ npx prisma migrate dev --name name_change 
```
Your Prisma schema is once again in sync with your database schema, and your migration history contains two migrations
## 6. Create module, service for database
[lifecycle-events](https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events-1) -> onModuleInit(): Called once the host module's dependencies have been resolved.
```bash
$ nest g module database

$ nest g service database
```
`database.module.ts`
```bash
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
```
`database.service.ts`
```bash
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect()
    }
}
```
## 7. Create `resource` for `employee`
[crud-generator](https://docs.nestjs.com/recipes/crud-generator)
```bash
$ nest g resource employee
```

- Delete 2 folders `dto` and `entities`

`employees.module.ts`
```bash
import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
```
`employees.controller.ts`
```bash
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
```
