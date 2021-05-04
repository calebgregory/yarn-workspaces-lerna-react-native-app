import { resolve } from 'path'
import { init } from '@calebgregory/core-init-node-js'
import { globalize } from '@calebgregory/core'

const INSTRUCTIONS = `
${'*'.repeat(75)}
*
* (>'')>  welcome!  you are inside a Node.js REPL :)
*
* preloaded into this REPL is a module '@calebgregory/core'.  any code you
* write that depends on '@calebgregory/core' will have access to an AppCore
* initialized and globalized by this Node.js app.
*
* you can now import and run functions you've written that rely on
* '@calebgregory/core' having been initialized
*
* check out this link to see .commands available to you in a Node.js REPL:
*   https://nodejs.dev/learn/how-to-use-the-nodejs-repl#dot-commands <(''<)
*
${'*'.repeat(75)}
`

const APP_DIR = resolve(__dirname, '../test/fs')

async function main() {
  const core = await init({ appDir: APP_DIR })

  globalize(core)

  console.log(INSTRUCTIONS)
}

main()