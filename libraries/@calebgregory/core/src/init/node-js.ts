import { readFile, writeFile } from 'fs/promises'
import { App, FileSystem } from '../types'

const fs: FileSystem = {
  readFile: (filename: string) => readFile(filename, { encoding: 'utf8' }),
  writeFile: (filename: string, content: string) => writeFile(filename, content)
}

export function init(): App {
  return {
    fs
  }
}