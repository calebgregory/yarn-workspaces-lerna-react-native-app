import { readFile, writeFile, DocumentDirectoryPath } from 'react-native-fs'
import { App, FileSystem } from '@calebgregory/core'

console.log('///', DocumentDirectoryPath)

const fs: FileSystem = {
  readFile: (filename: string) => readFile(DocumentDirectoryPath+filename),
  writeFile: (filename: string, content: string) => {
    const f = DocumentDirectoryPath + filename
    console.log('react-native fs writeFile', f)
    return writeFile(f, content)
  }
}

export function init(): App {
  return {
    fs
  }
}
