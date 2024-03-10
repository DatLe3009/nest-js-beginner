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
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,
      limit: 3,
    },{
      name: 'long',
      ttl: 60000,
      limit: 100,
    }]),
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
