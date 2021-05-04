import { AppCore } from '@calebgregory/core'

import { initFS } from './services/fs'

type Params = {
  appDir: string
}

export async function init({ appDir }: Params): Promise<AppCore> {
  const fs = await initFS(appDir)

  return { fs } as AppCore
}
