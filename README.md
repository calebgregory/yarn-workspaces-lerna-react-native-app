# yarn workspaces react-native / node.js app

## what do we have here?

![PlantUML Diagram](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/calebgregory/yarn-workspaces-lerna-react-native-app/master/docs/architecture-overview.iuml&cache=no)

- `apps/`
  - [ReactNativeApp](./apps/ReactNativeApp/index.js)
  - [node-js-app](./apps/node-js-app/src/index.ts)
- `libraries/`
  - [__core__](./libraries/@calebgregory/core/src/app.ts)
    - is initialized and globalized by each of the apps individually
  - [file-toy](./libraries/@calebgregory/file-toy/src/do/file/read-write.ts)
    - uses `core/app()` to read and write a file
  - [components](./libraries/@calebgregory/components/src/index.tsx)
    - defines some react-native Components used by `ReactNativeApp`
  - [errors](./libraries/@calebgregory/errors/src/index.ts)
    - exports an extension of `Error`, which allows putting additional properties onto `Errors`

## why would i want this?

it allows you to write Javascript code with, effectively, an injected environment.

look at the [`file-toy` library](./libraries/@calebgregory/file-toy/src/do/file/read-write.ts).  This file `import[s] { app } from '@calebgregory/core'` and uses it without having any idea what it is.

here is that code running into two completely different runtimes:

### in a react-native app

![react-native demo](./docs/assets/react-native-file-toy.gif)

### in a Node.js REPL

```txt
$ yarn start
...
Welcome to Node.js v14.16.0.
Type ".help" for more information.
>
***************************************************************************
* (>'')> bienvenidos!  welcome!  you are inside a __Node.js app__ :)
*
* preloaded into this REPL is a module '@calebgregory/core'.  any code you
* write that depends on '@calebgregory/core' will have access to an App
* defined and globalized by this Node.js app.
*
* you can now import and run functions you've written that rely on
* '@calebgregory/core' having been initialized <(''<)
***************************************************************************
> const toy = require('@calebgregory/file-toy')
undefined
> async function test() {
... await toy.readFile()
... await toy.writeFile()
... await toy.readFile()
... }
> test()
reading file...
read file... { txt: 'this is a file i wrote at 2021-04-30T15:55:46.770Z' }
writing file...
wrote file...
reading file...
read file... { txt: 'this is a file i wrote at 2021-04-30T16:22:52.081Z' }
```
