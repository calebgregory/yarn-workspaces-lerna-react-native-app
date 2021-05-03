import { App } from '@calebgregory/core'

import { initFS } from './services/fs'

export async function init(appDir: string): Promise<App> {
  const fs = await initFS(appDir)

  return {
    fs
  }
}
