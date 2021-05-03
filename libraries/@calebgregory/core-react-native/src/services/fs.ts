import { readFile, writeFile, DocumentDirectoryPath } from 'react-native-fs'
import { FileSystem } from '@calebgregory/core'

console.log('/// react-native-fs DocumentDirectoryPath', DocumentDirectoryPath)

export const fs: FileSystem = {
  readFile: (filename: string) => {
    const f = DocumentDirectoryPath + filename
    console.log('react-native fs readFile', f)
    return readFile(f)
  },
  writeFile: (filename: string, content: string) => {
    const f = DocumentDirectoryPath + filename
    console.log('react-native fs writeFile', f)
    return writeFile(f, content)
  }
}