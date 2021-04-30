import { init } from './init'
import { globalize } from '@calebgregory/core'

async function main() {
  const app = await init()
  globalize(app)
}

main()