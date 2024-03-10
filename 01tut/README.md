# 01: Introduction
[first-steps](https://docs.nestjs.com/first-steps)

[module](https://docs.nestjs.com/modules) 

[controller](https://docs.nestjs.com/controllers) 

[provider](https://docs.nestjs.com/providers)

[crud-generator](https://docs.nestjs.com/recipes/crud-generator)
## 1. Set up
```bash
$ npm i -g @nestjs/cli

$ nest new project-name
```

## 2. Create module, controller, provider for users
[name] = users
```bash
$ nest g module [name]

$ nest g controller [name]

$ nest g service [name]
```
Hint: [crud-generator](https://docs.nestjs.com/recipes/crud-generator)
```bash
$ nest g resource [name]
```
## error: delete 'CR'
`.eslintrc.js` 
```bash
"prettier/prettier": [
      "error",
      {
        "endOfLine": "off"
      }
    ]
```
`.prettierrc`
```bash
"endOfline": "auto"
```
