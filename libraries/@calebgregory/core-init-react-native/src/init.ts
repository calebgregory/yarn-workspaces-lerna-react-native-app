import { AppCore } from '@calebgregory/core'
import { fs } from './services/fs'

export function init(): AppCore {
  return { fs } as AppCore
}
