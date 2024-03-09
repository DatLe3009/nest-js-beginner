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

