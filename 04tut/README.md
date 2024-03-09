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

