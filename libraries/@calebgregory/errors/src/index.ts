export class EError extends Error {
  addl: {[key: string]: any}

  constructor(message: string, addl: {[key: string]: any}) {
    super(message)
    this.addl = addl
  }
}
