# 04: DTO Validation
[Pipes](https://docs.nestjs.com/pipes)

[example DTO](https://docs.nestjs.com/controllers#request-payloads)

[position DTO](https://docs.nestjs.com/modules#feature-modules)

[Validation](https://docs.nestjs.com/techniques/validation)

## 1. ParseIntPipe (@nest/common)
`user.controller.ts`
```bash
 @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }
```
## 2. DTO
### B1: Create a folder `dto` ([position DTO](https://docs.nestjs.com/modules#feature-modules)) in the folder `users`
### B2: Create a file `create-user.dto.ts` in the folder `dto`
```bash
```
### B3: Create a file `update-user.dto.ts` in the folder `dto`
```bash
$ npm i @nestjs/mapped-types -D
```
`update-user.dto.ts`
```bash
import { CreateUserDto } from "./create-user.dto"
import { PartialType} from "@nestjs/mapped-types"

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```
### B4: Use `create-user.dto.ts` and `update-user.dto.ts`
`user.controller.ts`
```bash
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.userService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
```


