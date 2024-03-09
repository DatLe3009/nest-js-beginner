# 01: Introduction
[first-steps](https://docs.nestjs.com/first-steps)

[module](https://docs.nestjs.com/modules) 

[controller](https://docs.nestjs.com/controllers) 

[provider](https://docs.nestjs.com/providers) for users

## 1. Set up

```bash
$ npm i -g @nestjs/cli

$ nest new project-name
```

## 2. Create module, controller, provider for users
```bash
$ nest g module users

$ nest g controller users

$ nest g service users
```

## error: delete 'CR'
### .eslintrc.js 

```bash
"prettier/prettier": [
      "error",
      {
        "endOfLine": "off"
      }
    ]
```
### .prettierrc

```bash
"endOfline": "auto"
```

