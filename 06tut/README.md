# 06: Essential Additions
[security](https://docs.nestjs.com/security) -> CORS, Rate limiting

[faq/global-prefix](https://docs.nestjs.com/faq/global-prefix)

[techniques/logger](https://docs.nestjs.com/techniques/logger)

[exception-filters](https://docs.nestjs.com/exception-filters)
## 1. faq/global-prefix, security/CORS
`main.ts`
```bash
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all.exceptions.filter';      // exceptions.filter

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter} = app.get(HttpAdapterHost);                 // exceptions.filter
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));       // exceptions.filter

  app.enableCors();                                                // cors
  app.setGlobalPrefix('api');                                      // global-prefix
  await app.listen(3000);
}
bootstrap();
```
## 2. security/Rate limiting
```bash
$ npm i @nestjs/throttler
```
`app.module.ts`
```bash
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';      // rate limiting
import { APP_GUARD } from '@nestjs/core';                                 // rate limiting
import { MyLoggerModule } from './my-logger/my-logger.module';            // logger

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule,
    ThrottlerModule.forRoot([{                                            /* rate limiting
      name: 'short',
      ttl: 1000,
      limit: 3,
    },{
      name: 'long',
      ttl: 60000,
      limit: 100,
    }]),                                                                     rate limiting */
    MyLoggerModule                                                         // logger
  ],
  controllers: [AppController],
  providers: [ AppService, { 
    provide: APP_GUARD,                                                    // rate limiting
    useClass: ThrottlerGuard,                                              // rate limiting
  }],
})
export class AppModule {}
```
`employees.controller.ts`
```bash
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';                // rate limiting
import { MyLoggerService } from 'src/my-logger/my-logger.service';         // logger

@SkipThrottle()                                                            // rate limiting
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name)  // logger

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({default: false})                                          // rate limiting
  @Get()
  findAll(@Ip() ip:string, @Query('role') role?: Role) {
    this.logger.log(`Request for ALL Employees\t${ip}`, EmployeesController.name);      // logger have @Ip
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: {ttl: 1000, limit: 1}})                               // rate limiting
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
## 3. techniques/logger
Create module, service for my-logger
```bash
$ nest g module my-logger

$ nest g service my-logger
```
`my-logger.service.ts`
```bash
import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises} from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger{
    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh'
        }).format(new Date())}\t${entry}\n`

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs','myLogFile.log'), formattedEntry)
        } catch (err) {
            if (err instanceof Error) console.error(err.message)
        }
    }

    log(message: any, context?:string) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
```
`my-logger.module.ts`
```bash
import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';

@Module({
  providers: [MyLoggerService],
  exports: [MyLoggerService]
})
export class MyLoggerModule {}
```
## 4. Exception-filters
Create new file `all.exception-filters.ts` in /src and import it on `main.ts`

`all.exception-filters.ts`
```bash
import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

type MyResponseObj = {
    statusCode: number,
    timestamp: string,
    path: string,
    response: string | object,
}

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx  = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const myResponseObj: MyResponseObj = {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: '',
        }

        if (exception instanceof HttpException) {
            myResponseObj.statusCode = exception.getStatus()
            myResponseObj.response = exception.getResponse()
        } else if (exception instanceof PrismaClientValidationError) {
            myResponseObj.statusCode = 422
            myResponseObj.response = exception.message.replace(/\n/g,'')
        } else {
            myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            myResponseObj.response = 'Internal Server Error'
        }

        response
            .status(myResponseObj.statusCode)
            .json(myResponseObj)

        this.logger.error(myResponseObj.response, AllExceptionFilter.name)

        super.catch(exception, host)
    }
}
```
## error testcase
### error 1: Cannot find module 'src/database/database.service' from 'employees/employees.service.ts'
### error 2:  Nest can't resolve dependencies of the UsersController (?). Please make sure that the argument UsersService at index [0] is available in the RootTestModule context.
`employees.controller.spec.ts`
```bash
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseModule } from '../database/database.module';      // add to fix error, changing To Relative Imports

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],                                    // / add to fix error
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

```

