# RequestIt Client

A stupidly simple HTTP client for Node-JS that should just work. Built-in support for cookies, JSON, and may follow up to a max of 20 redirects.

Now has a `fetch` implementation which will eventually become the standard export in version 3.

## Usage

Install via [NPM](https://www.npmjs.com/package/request-it-client) and require in your project. Then request it and go!

```js
const { RequestIt } = require('request-it-client')

;(async function main () {
  const res = await RequestIt.go('https://reqres.in/api/users/2')

  console.log(res.body.data.first_name) // expected result: Janet
})()
```

### Fetch API

This library now implements the Web standard Fetch API, in as much it makes sense in server-side Node. There is no support for form data or blobs; cookies have been exposed on the response object.

Install this library and the optional dependency for `fetch`.

```shell
npm install --save request-it-client web-streams-polyfill
```

Then start fetching:

```javascript
import { fetch } from 'request-it-client/src/fetch'

async function main () {
  const res = await fetch('https://reqres.in/api/users/2')
  const body = await res.json()

  console.log(res.body.data.first_name) // expected result: Janet
}
```

## API

