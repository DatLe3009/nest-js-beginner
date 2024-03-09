# [1. first-steps](https://docs.nestjs.com/first-steps)

```bash
$ npm i -g @nestjs/cli

$ nest new project-name
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

# Create [module](https://docs.nestjs.com/modules), [controller](https://docs.nestjs.com/controllers), [provider](https://docs.nestjs.com/providers) for users
```bash
nest g module users

nest g controller users

nest g service users
```
