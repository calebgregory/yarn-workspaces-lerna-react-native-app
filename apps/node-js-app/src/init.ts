import { resolve } from 'path'
import { mkdir, readFile, stat, writeFile } from 'fs/promises'
import { App, FileSystem } from '@calebgregory/core'

const APP_DIR = resolve(__dirname, '../test/fs')

const fs: FileSystem = {
  readFile: (filename: string) =>
    readFile(resolve(APP_DIR, '.'+filename), { encoding: 'utf8' }),
  writeFile: (filename: string, content: string) =>
    writeFile(resolve(APP_DIR, '.'+filename), content)
}

export async function init(): Promise<App> {
  // make app dir if it doesn't exist
  await stat(APP_DIR).catch(() => mkdir(APP_DIR))

  return {
    fs
  }
}
