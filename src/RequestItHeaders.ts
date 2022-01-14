export class RequestItHeaders extends Map<string, string> implements Headers {
  constructor (init: Iterable<readonly [string, string]> | Record<string, string | string[]>) {
    if (isIterable(init)) {
      super(init)
    } else if (typeof init === 'object') {
      super(
        Object.entries(init).map(([name, value]) => {
          return Array.isArray(value) ? [name, value.join(', ')] : [name, value]
        })
      )
    }
  }

  private testName (name: string): boolean {
    return (/^[-_a-zA-Z0-9]+$/gu).test(name)
  }

  append (name: string, value: string): void {
    if (!this.testName(name)) throw new TypeError('Headers.append:' + name + ' is an invalid header name.')

    const oldVal = this.get(name)

    if (typeof oldVal === 'string') {
      super.set(toString(name), oldVal + ', ' + toString(value).trim())
    } else {
      super.set(toString(name), toString(value).trim())
    }
  }

  set (name: string, value: string): this {
    if (!this.testName(name)) throw new TypeError('Headers.set:' + name + ' is an invalid header name.')
    super.set(toString(name), toString(value).trim())

    return this
  }

  forEach: (callbackfn: (value: string, key: string, parent: RequestItHeaders) => void, thisArg?: any) => void
}

function toString (value: any): string {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (typeof value?.toString === 'function') return value.toString()

  return Object.prototype.toString.call(value)
}

function isIterable (value: any): value is Iterable<any> {
  return typeof value[Symbol.iterator] === 'function'
}