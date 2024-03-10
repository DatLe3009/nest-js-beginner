# 06: Essential Additions
[security](https://docs.nestjs.com/security) -> CORS, Rate limiting

[global-prefix](https://docs.nestjs.com/faq/global-prefix)


## 1. global-prefix, security `CORS`
`main.ts`
```bash
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './all.exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  app.enableCors();                                                // cors
  app.setGlobalPrefix('api');                                      // global-prefix
  await app.listen(3000);
}
bootstrap();
```
## 2. security `Rate limiting`
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
import { MyLoggerModule } from './my-logger/my-logger.module';

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
    MyLoggerModule                                                        
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
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()                                                            // rate limiting
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name)

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({default: false})                                          // rate limiting
  @Get()
  findAll(@Ip() ip:string, @Query('role') role?: Role) {
    this.logger.log(`Request for ALL Employees\t${ip}`, EmployeesController.name);
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
