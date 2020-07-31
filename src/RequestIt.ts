import * as http from 'http'
import * as https from 'https'
import { Socket } from 'net'
import { RequestOptions, IncomingMessage } from './Interfaces'
import { RequestItCookieJar } from './RequestItCookieJar'

/** Node.js library for Promise-based, asynchronous http/s requests. */
export class RequestIt {
  /** @param {RequestOptions} [options={}] - Default options. Object like NodeJS RequestOptions, but with additional parameters accepted. */
  constructor (options: RequestOptions = {}) {
    this.options = options

    if (this.isNullOrUndefined(this.options.cookieJar)) {
      this.cookieJar = new RequestItCookieJar()
    } else {
      this.cookieJar = RequestItCookieJar.fromCookieJar(this.options.cookieJar)
    }
  }

  options: RequestOptions
  cookieJar: RequestItCookieJar

  private isNullOrUndefined (value: any): boolean {
    return typeof value === 'undefined' || value === null
  }

  private getProtocol (url: string | URL): string {
    if (typeof url === 'string' || url instanceof URL) {
      return new URL(url as string).protocol.toLowerCase().replace(/:/gu, '')
    }

    throw new Error('URL is not one of either "string" or instance of "URL".')
  }

  private getSafeOptions (options: RequestOptions | string | URL): RequestOptions {
    if (typeof options === 'string' || options instanceof URL) {
      options = { url: options }
    }

    return {
      ...this.options,
      ...options
    }
  }

  private cleanUpOptions (options: RequestOptions): RequestOptions {
    options = { ...options }

    delete options.body
    delete options.json
    delete options.rejectBadJson
    delete options.responseType
    delete options.url
    delete options.cookieJar
    delete options.params

    return options
  }

  private jsonify (body: string | Buffer | object | any[], json: any): boolean {
    if (
      !this.isNullOrUndefined(json) ||
      Array.isArray(body) ||
      (typeof body === 'object' && !Buffer.isBuffer(body))
    ) {
      return true
    }

    return false
  }

  private prepareBody (body: string | Buffer | object | any[], json: any): string | Buffer {
    if (this.jsonify(body, json)) {
      return JSON.stringify(body || json)
    }

    if (this.isNullOrUndefined(body)) {
      return ''
    }

    return body as string | Buffer
  }

  private prepareOptions (options: RequestOptions, body: string | Buffer, cookieString: string, jsonify: boolean): RequestOptions {
    options = this.cleanUpOptions(options)
    let contentTypeExists = false
    let contentLengthExists = false

    for (const [key] of Object.entries(options.headers || {})) {
      if (key.toLowerCase() === 'content-type') contentTypeExists = true
      if (key.toLowerCase() === 'content-length') contentLengthExists = true
    }

    if (!contentTypeExists && jsonify) {
      options.headers = {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }

    if (!contentLengthExists) {
      options.headers = {
        'Content-Length': body.length,
        ...options.headers
      }
    }

    if (!this.isNullOrUndefined(cookieString) && cookieString !== '') {
      options.headers.cookie = cookieString
    }

    return options
  }

  private async quickMethod (method: string, options: RequestOptions | string | URL = {}) {
    options = {
      ...this.getSafeOptions(options),
      method: method
    }

    return await this.go(options)
  }

  /** Base method for making a request.
   * @param {RequestOptions|string|URL} [options={}] - Options to override the defaults, or a url.
   * @returns {Promise<IncomingMessage|object>} The IncomingMessage object with parsed body and RawBody, or the response body.
   */
  async go (options: RequestOptions | string | URL = {}): Promise<IncomingMessage> {
    const self = this
    options = this.getSafeOptions(options)

    const promise = new Promise<IncomingMessage>((resolve, reject) => {
      try {
        const {
          body,
          params,
          url,
          json,
          rejectBadJson,
          responseType,
          cookieJar
        } = options as RequestOptions
        const internalUrl = new URL(url as string)
        const internalBody = self.prepareBody(body, json)
        const protocol = self.getProtocol(internalUrl) === 'https' ? https : http
        const jsonify = self.jsonify(body, json)
        const internalCookieJar = typeof cookieJar === 'undefined'
          ? self.cookieJar
          : RequestItCookieJar.fromCookieJar(cookieJar)
        const internalOptions = self.prepareOptions(
          options as RequestOptions,
          internalBody,
          internalCookieJar.getCookieStringSync(internalUrl.toString()),
          jsonify
        )

        internalOptions.method = internalOptions.method || 'GET'

        for (const [key, val] of Object.entries(params || {})) {
          if (!self.isNullOrUndefined(val)) {
            internalUrl.searchParams.append(key, val as any)
          }
        }

        const responseBufs: Buffer[] = []
        const req = protocol.request(
          internalUrl,
          internalOptions,
          (response: IncomingMessage) => {
            try {
              const bodyBufs: Buffer[] = []
    
              response.on('data', (data: Buffer) => bodyBufs.push(data))
              response.on('error', error => reject(error))
              response.on('end', () => {
                try {
                  const rawResponse = Buffer.concat(responseBufs)
                  const rawBody = Buffer.concat(bodyBufs)
                  response.body = rawBody.toString('utf8')
                  response.cookieJar = internalCookieJar
                  response.rawBody = rawBody
                  response.rawResponse = rawResponse
                  response.json = function json () {
                    try {
                      return JSON.parse(rawBody.toString('utf8'))
                    } catch (err) {
                      if (rejectBadJson) {
                        throw err
                      } else {
                        return err
                      }
                    }
                  }

                  if (
                    responseType === 'json' ||
                    (
                      typeof response.headers['content-type'] === 'string' &&
                      response.headers['content-type'].toLowerCase().startsWith('application/json')
                    )
                  ) {
                    response.body = response.json()
                  }

                  if (typeof response.headers['set-cookie'] === 'undefined') {
                    resolve(response)
                  } else {
                    const promises = response.headers['set-cookie'].map((cookie) => internalCookieJar.setCookie(cookie, internalUrl.toString()))

                    Promise.all(promises).then(
                      () => resolve(response),
                      (reason) => reject(reason)
                    )
                  }
                } catch (err) {
                  reject(err)
                }
              })
            } catch (err) {
              reject(err)
            }
          }
        )
        req.on('error', error => reject(error))
        req.on('socket', (socket: Socket) => {
          socket.on('data', (data: Buffer) => responseBufs.push(data))
        })
        req.write(internalBody)
        req.end()
      } catch (error) {
        reject(error)
      }
    })

    return promise
  }

  async get (options: RequestOptions | string | URL = {}) {
    return await this.quickMethod('GET', options)
  }

  async patch (options: RequestOptions | string | URL = {}) {
    return await this.quickMethod('PATCH', options)
  }

  async post (options: RequestOptions | string | URL = {}) {
    return await this.quickMethod('POST', options)
  }

  async put (options: RequestOptions | string | URL = {}) {
    return await this.quickMethod('PUT', options)
  }

  async delete (options: RequestOptions | string | URL = {}) {
    return await this.quickMethod('DELETE', options)
  }

  static async go (options: RequestOptions | string | URL = {}) {
    return await new RequestIt().go(options)
  }

  static async get (options: RequestOptions | string | URL = {}) {
    return await new RequestIt().get(options)
  }

  static async patch (options: RequestOptions | string | URL = {}) {
    return await new RequestIt().patch(options)
  }

  static async post (options: RequestOptions | string | URL = {}) {
    return await new RequestIt().post(options)
  }

  static async put (options: RequestOptions | string | URL = {}) {
    return await new RequestIt().put(options)
  }

  static async delete (options: RequestOptions | string | URL = {}) {
    return await new RequestIt().delete(options)
  }
}