# 01: Introduction
1. [first-steps](https://docs.nestjs.com/first-steps)

2. [module](https://docs.nestjs.com/modules) 

3. [controller](https://docs.nestjs.com/controllers) 

4. [provider](https://docs.nestjs.com/providers)

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

