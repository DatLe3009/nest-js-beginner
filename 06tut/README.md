# 06: Essential Additions
[security](https://docs.nestjs.com/security

[security](https://docs.nestjs.com/security) -> CORS

[global-prefix](https://docs.nestjs.com/faq/global-prefix)


# 1. global-prefix, cors
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
