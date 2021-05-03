import { App } from '@calebgregory/core'
import { fs } from './services/fs'

export function init(): App {
  return {
    fs
  }
}
