import { EError } from '@calebgregory/errors'
import { App } from './types'

const HELP = `
The app() exported from core needs to be initialized and globalized.  YOUR
APPLICATION is responsible for doing this.  That will look something like:


/* my-app/src/main.ts */

import { globalize } from '@calebgregory/core'
import { init } from './init'

const app = await init()
globalize(app)


Once you've done that, you can validly access and use app() like this:


/* my-library/src/do/something.ts */

import { app } from '@calebgregory/core'

export async function doSomethingIOful() {
  const { fs } = app()

  await fs.readFile()
}


So, wherever you are, make sure you've initialized and globalized the app!
Otherwise there's no app (a.k.a. 'core library') for you to use.`

let _app: App | null = null

export function app(): App {
  if (!_app) {
    throw new EError('app has not been initialized.  go do that!', { HELP })
  }

  return _app
}

export function globalize(a: App) {
  _app = a
}