import { resolve } from 'path'
import { mkdir, readFile, stat, writeFile } from 'fs/promises'

import { FileSystem } from '@calebgregory/core'

export async function initFS(appDir: string): Promise<FileSystem> {
  // make app dir if it doesn't exist
  await stat(appDir).catch(() => mkdir(appDir))

  const fs = {
    // this is a rudimentary implementation for proof of concept
    readFile: (filename: string) =>
      readFile(resolve(appDir, '.'+filename), { encoding: 'utf8' }),
    writeFile: (filename: string, content: string) =>
      writeFile(resolve(appDir, '.'+filename), content)
  }

  return fs
}