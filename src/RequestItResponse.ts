import { ReadableStream as WebReadable } from 'web-streams-polyfill/ponyfill/es2018'
import { RequestItHeaders } from './RequestItHeaders'
import type { IncomingMessage } from './Interfaces'
import type { RequestItCookieJar } from './RequestItCookieJar'

function toArrayBuffer (buffer: Buffer) {
  const arraybuffer = new ArrayBuffer(buffer.length)
  const view = new Uint8Array(arraybuffer)

  for (let i = 0; i < buffer.length; i += 1) view[i] = buffer[i]

  return arraybuffer
}

export class RequestItResponse implements Response {
  constructor (msg: IncomingMessage) {
    let index = 0
    const source = {
      pull: (controller: ReadableStreamController<Uint8Array>) => {
        if (index < this.msg.rawBody.length) {
          const chunk = new Uint8Array(1)
          chunk[0] = this.msg.rawBody[index]
          controller.enqueue(chunk)
          index += 1
        } else {
          controller.close()
        }
      }
    }
    this.msg = msg
    this.used = false
    this.hdrs = new RequestItHeaders(msg.headers)
    this.strm = new WebReadable<Uint8Array>(source)
  }

  private msg: IncomingMessage
  private strm: WebReadable<Uint8Array>
  private hdrs: RequestItHeaders
  private used: boolean

  get body (): ReadableStream<Uint8Array> {
    this.used = true
    return this.strm as unknown as any
  }

  get bodyUsed (): boolean {
    return this.used
  }

  /** Because server-side javascript has no global cookie methods. */
  get cookies (): RequestItCookieJar {
    return this.msg.cookieJar
  }

  get headers (): RequestItHeaders {
    return this.hdrs
  }

  get ok (): boolean {
    return this.msg.statusCode >= 200 && this.msg.statusCode <= 299
  }

  get redirected (): boolean {
    return this.msg.redirected
  }

  get status (): number {
    return this.msg.statusCode
  }

  get statusText (): string {
    return this.msg.statusMessage
  }

  /** Always basic; server side has no respect for cors. */
  get type (): ResponseType {
    return 'basic'
  }

  get url (): string {
    return this.msg.url
  }

  clone (): RequestItResponse {
    return new RequestItResponse(this.msg)
  }

  async arrayBuffer (): Promise<ArrayBuffer> {
    this.used = true
    return toArrayBuffer(this.msg.rawBody)
  }

  /** Unsupported method. */
  blob (): never {
    throw new ReferenceError('UNSUPPORTED')
  }

  /** Unsupported method. */
  formData (): never {
    throw new ReferenceError('UNSUPPORTED')
  }

  async json (): Promise<any> {
    this.used = true
    return this.msg.json()
  }

  async text (): Promise<string> {
    this.used = true
    return this.msg.rawText
  }
}
