import { EError } from '@calebgregory/errors'
import { App } from './types'

let _app: App | null = null

export function app(): App {
  if (!_app) {
    throw new EError('app has not been initialized.  go do that!', {
      advice: `
      The app() exported from core needs to be initialized and globalized.  YOUR
      APPLICATION is responsible for doing this.  That will look something like:

      ---
      import { globalize } from '@calebgregory/core'
      import { init } from 'my-app/init'

      const app = await init()
      globalize(app)
      ---

      Once you've done that, you can validly access the "app" object stored at the
      location internally referenced from within this app() function.
      `
    })
  }

  return _app
}

export function globalize(a: App) {
  _app = a
}