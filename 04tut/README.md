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
## 2. DTO Validation
### B1: Create a folder `dto` ([position DTO](https://docs.nestjs.com/modules#feature-modules)) in the folder `users`
### B2: Create a file `create-user.dto.ts` in the folder `dto`
[TECHNIQUES/Validation](https://docs.nestjs.com/techniques/validation)
```bash
$ npm i class-validator class-transformer
```
`create-user.dto.ts`
```bash
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["INTERN" , "ENGINEER" , "ADMIN"], {
        message: 'valid role required'
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}
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
`users.service.ts`
```bash
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.0Conner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (!rolesArray.length) throw new NotFoundException('User Role Not Found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if(!user) throw new NotFoundException('User Not Found');

        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
```


