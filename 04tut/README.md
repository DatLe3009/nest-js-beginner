# 04: DTO Validation
4.1. [Pipes](https://docs.nestjs.com/pipes)
## 1. ParseIntPipe (@nest/common)
`user.controller.ts`
```bash
 @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id)
    }
```
## 2: DTO

