<<<<<<< HEAD
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

to stop it, just run:
```
brew services stop redis
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
=======
# Project Setup :bulb:

J'ai séparé le Backend dans server, le front dans client/web.

Quelques Remaques :

- J'ai utilisé Vue 3 pour le front
- J'ai utilisé les fonctions "beta" crud de Nexus pour construire les queries et les mutations

## Backend first :card_file_box:

#### First install the packages :white_check_mark:

```shell
yarn
```

#### Then launch the Playground :construction_worker:

```shell
yarn dev:nexus
```

## FrontEnd :art:

#### First install the packages :white_check_mark:

```shell
yarn
```

#### Then launch the front :tada:

```shell
yarn serve
```
>>>>>>> 003a6a95fdfcdf482ab1db8a32be0ed823e24747
