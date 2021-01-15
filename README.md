# Getting started

```
$ yarn
$ yarn build
$ yarn run:server
```

Make sure to install Redis:

On Mac:

```
$ brew update
$ brew install redis
```

To have launchd start redis now and restart at login:
```
$ brew services start redis
```

## To make your code prettier

```
$ yarn style
```

# Project overview
Development env: UNIX / MacOS / LINUX

IDE: VSCode

DB - Prisma - GraphQL - Apollo server structure overview:
![image](https://github.com/BASARANOMO/harvestr_project_graphQL/blob/main/IMG/structure.png)
(Image credit: https://github.com/prisma-labs/graphql-framework-experiment.git)

Please find in the "Projects" tab some guidance on the steps to follow

# Dependencies

```
"@nexus/schema": "^0.18.0",
"@prisma/client": "^2.11.0",
"apollo-server": "^2.19.0",
"graphql": "^15.4.0",
"nexus-plugin-prisma": "^0.23.1"
```
