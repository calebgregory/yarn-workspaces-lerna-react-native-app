export interface FileSystem {
  readFile: (filename: string) => Promise<string>;
  writeFile: (filename: string, content: string) => Promise<void>;
}

export interface AppCore {
  fs: FileSystem
}
