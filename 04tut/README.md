# 04: DTO Validation
4.1. [Pipes](https://docs.nestjs.com/pipes)
## 1. user.controller.ts : use ParseIntPipe (@nest/common)
```bash
 @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }
```
## 2: Change src/users/users.controller.ts

