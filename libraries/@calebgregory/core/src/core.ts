import { EError } from '@calebgregory/errors'
import { AppCore } from './types'

const HELP = `
The core() exported from 'core' needs to be initialized and globalized.  YOUR
APPLICATION is responsible for doing this.  That will look something like:


/* my-app/src/main.ts */

import { globalize } from '@calebgregory/core'
import { init } from './init'

const core = await init()
globalize(core)


Once you've done that, you can validly access and use app() like this:


/* my-library/src/do/something.ts */

import { core } from '@calebgregory/core'

export async function doSomethingIOful() {
  const { fs } = core()

  await fs.readFile()
}


So, wherever you are, make sure you've initialized and globalized the app core!
Otherwise there's no core for you to use.`

let _core: AppCore | null = null

export function core(): AppCore {
  if (!_core) {
    throw new EError('core has not been initialized.  go do that!', { HELP })
  }

  return _core
}

export function globalize(a: AppCore) {
  _core = a
}