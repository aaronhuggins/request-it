import { RequestIt } from './RequestIt'
import { RequestItResponse } from './RequestItResponse'
import { RequestItHeaders } from './RequestItHeaders'
import type { RequestOptions } from './Interfaces'

/**
 * The fetch API using RequestIt as a back-end.
 * If using for the first time, we suggest [Deno's native fetch](https://doc.deno.land/deno/stable/~/fetch) or [node-fetch](https://github.com/node-fetch/node-fetch).
 * The developer's personal and business projects will be migrating to native fetch in 2022.
 * This acts as a transitional helper to move code to Fetch API semantics before deprecating.
 * It is not a complete implemntation; it never will be.
 * 
 * @param input - As opposed to the browser where `Request` is supported, this only accepts a URL.
 * @param init - only method, headers, body, headers, and redirect are supported; all other options are ignored.
 */
export async function fetch (input: string | URL, init: RequestInit = {}): Promise<RequestItResponse> {
  return new RequestItResponse(await RequestIt.go(requestOptsTransform(input, init)))
}

function requestOptsTransform (url: string | URL, init: RequestInit): RequestOptions {
  const opts: RequestOptions = {
    url,
    // Handle method
    method: init.method ?? 'GET'
  }

  // handle the body
  const initBody = init.body
  if (typeof initBody === 'string') {
    opts.body = initBody
  } else if (typeof initBody === 'undefined') {
    // Ignore if undefined
  } else if (ArrayBuffer.isView(initBody)) {
    opts.body = Buffer.from(initBody.buffer)
  } else if (initBody instanceof ArrayBuffer) {
    opts.body = Buffer.from(initBody)
  } else if (isURLSearchParams(initBody)) {
    const form = new URLSearchParams()
    for (const [key, val] of initBody.entries()) form.append(key, val)
  } else {
    throw new TypeError('Unsupported body type in request.')
  }

  // Handle headers
  const initHeaders = init.headers
  if (typeof initHeaders === 'undefined') {
    // Ignore if undefined
  } else if (Array.isArray(initHeaders)) {
    const headers = {}
    for (const [key, value] of initHeaders) headers[key] = value
    opts.headers = headers
  } else if (isHeaders(initHeaders)) {
    const headers = {}
    for (const [key, value] of initHeaders.entries()) headers[key] = value
    opts.headers = headers
  } else {
    opts.headers = initHeaders
  }

  // Handle redirects
  switch (init.redirect) {
    case 'error':
      opts.maxRedirects = 0
      opts.followRedirect = true
      break
    case 'manual':
      opts.maxRedirects = 20
      opts.followRedirect = false
      break
    case 'follow':
    default:
      opts.maxRedirects = 20
      opts.followRedirect = true
      break
  }

  return opts
}

function isURLSearchParams (params: any): params is URLSearchParams {
  try {
    return params instanceof URLSearchParams
  } catch (err) {}

  return params?.__proto__?.constructor?.name === 'URLSearchParams'
}

function isHeaders (params: any): params is Headers {
  try {
    return params instanceof Headers
  } catch (err) {}

  return params instanceof RequestItHeaders ||
    params?.__proto__?.constructor?.name === 'Headers' ||
    params?.__proto__?.constructor?.name === 'RequestItHeaders'
}
