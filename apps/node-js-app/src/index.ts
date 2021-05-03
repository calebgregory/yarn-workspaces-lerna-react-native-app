import { resolve } from 'path'
import { init } from '@calebgregory/core-node-js'
import { globalize } from '@calebgregory/core'

const INSTRUCTIONS = `
${'*'.repeat(75)}
* (>'')> bienvenidos!  welcome!  you are inside a __Node.js app__ :)
*
* preloaded into this REPL is a module '@calebgregory/core'.  any code you
* write that depends on '@calebgregory/core' will have access to an App
* defined and globalized by this Node.js app.
*
* you can now import and run functions you've written that rely on
* '@calebgregory/core' having been initialized <(''<)
${'*'.repeat(75)}
`

const APP_DIR = resolve(__dirname, '../test/fs')

async function main() {
  const app = await init(APP_DIR)
  globalize(app)
  console.log(INSTRUCTIONS)
}

main()