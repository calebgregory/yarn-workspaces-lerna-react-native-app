import { init } from './init'
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

async function main() {
  const app = await init()
  globalize(app)
  console.log(INSTRUCTIONS)
}

main()