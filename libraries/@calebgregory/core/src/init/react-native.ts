import { readFile, writeFile } from 'react-native-fs'
import { App, FileSystem } from '../types'

const fs: FileSystem = {
  readFile: (filename: string) => readFile(filename),
  writeFile: (filename: string, content: string) => writeFile(filename, content),
}

export function init(): App {
  return {
    fs
  }
}
