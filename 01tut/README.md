# [first-steps](https://docs.nestjs.com/first-steps)

```bash
$ npm i -g @nestjs/cli

$ nest new project-name
```

## <span style="color:red">error: delete 'CR'</span>
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

# Create module, controller, service for users

nest g module users -> add controller, provider on module

nest g controller users

nest g service users
