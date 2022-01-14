# RequestIt Client

A stupidly simple HTTP client for Node-JS that should just work. Built-in support for cookies, JSON, and may follow up to a max of 20 redirects.

It is expected to deprecate this module in favor of [Deno's native fetch](https://doc.deno.land/deno/stable/~/fetch) or [node-fetch](https://github.com/node-fetch/node-fetch) by end of year 2022.

If you are using this module in production, we suggest upgrading to v2, gradually moving to the Fetch API, and then replacing this lib with native or node-fetch.

We will accept bug reports and patches through Nov 2022.

## Usage

Install via [NPM](https://www.npmjs.com/package/request-it-client) and require in your project.

### Fetch API (Recommended migration path)

```js
const { fetch } = require('request-it-client')

;(async function main () {
  const res = await fetch('https://reqres.in/api/users/2')
  const body = await res.json()

  console.log(body.data.first_name) // expected result: Janet
})()
```

### RequestIt interface

```js
const { RequestIt } = require('request-it-client')

;(async function main () {
  const res = await RequestIt.go('https://reqres.in/api/users/2')

  console.log(res.body.data.first_name) // expected result: Janet
})()
```

## RequestIt API
