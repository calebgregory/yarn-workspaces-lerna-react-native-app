import { app } from '@calebgregory/core'

const THE_FILE = '/my-file.txt'

export async function writeFile() {
  const { fs } = app()

  console.log('writing file...')
  await fs.writeFile(THE_FILE, `this is a file i wrote at ${new Date().toISOString()}`)
  console.log('wrote file...')
}

export async function readFile() {
  const { fs } = app()

  console.log('reading file...')
  const txt = await fs.readFile(THE_FILE)
  console.log('read file...', {txt})
  return txt
}
