import { RequestIt } from './RequestIt'
import { RequestItResponse } from './RequestItResponse'
import type { RequestOptions } from './Interfaces'

/** Use the fetch API around RequestIt. */
export async function fetch (input: string | URL, init: Omit<RequestOptions, 'url'> = {}): Promise<RequestItResponse> {
  return new RequestItResponse(await RequestIt.go({
    url: input,
    ...init
  }))
}
