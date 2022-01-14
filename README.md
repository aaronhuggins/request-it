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

<a name="classesrequestitmd"></a>

### Class: RequestIt

Node.js library for Promise-based, asynchronous http/s requests.

#### Constructors

##### constructor

• **new RequestIt**(`options?`)

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RequestOptions`](#interfacesrequestoptionsmd) |

#### Properties

##### cookieJar

• **cookieJar**: [`RequestItCookieJar`](#classesrequestitcookiejarmd)

___

##### maxRedirects

• **maxRedirects**: `number`

___

##### options

• **options**: [`RequestOptions`](#interfacesrequestoptionsmd)

#### Methods

##### delete

▸ **delete**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### get

▸ **get**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### go

▸ **go**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

Base method for making a request.

###### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

The IncomingMessage object with parsed body and RawBody.

___

##### patch

▸ **patch**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### post

▸ **post**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### put

▸ **put**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### delete

▸ `Static` **delete**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### get

▸ `Static` **get**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### go

▸ `Static` **go**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### patch

▸ `Static` **patch**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### post

▸ `Static` **post**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### put

▸ `Static` **put**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| `URL` \| [`RequestOptions`](#interfacesrequestoptionsmd) |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>


<a name="classesrequestitcookiejarmd"></a>

### Class: RequestItCookieJar

#### Hierarchy

- `CookieJar`

  ↳ **`RequestItCookieJar`**

#### Constructors

##### constructor

• **new RequestItCookieJar**(`store?`, `options?`)

###### Parameters

| Name | Type |
| :------ | :------ |
| `store?` | `Store` |
| `options?` | `Options` |

###### Inherited from

CookieJar.constructor

#### Properties

##### store

• **store**: [`RequestItStore`](#interfacesrequestitstoremd)

#### Methods

##### findCookie

▸ **findCookie**(`domain`, `path`, `key`): `Promise`<`Cookie`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `path` | `string` |
| `key` | `string` |

###### Returns

`Promise`<`Cookie`\>

___

##### getCookieString

▸ **getCookieString**(`currentUrl`, `options?`): `Promise`<`string`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `currentUrl` | `string` |
| `options?` | `Function` \| `GetCookiesOptions` |

###### Returns

`Promise`<`string`\>

###### Overrides

CookieJar.getCookieString

___

##### setCookie

▸ **setCookie**(`cookieOrString`, `currentUrl`, `options?`): `Promise`<`Cookie`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `cookieOrString` | `string` \| `Cookie` |
| `currentUrl` | `string` |
| `options?` | `Function` \| `SetCookieOptions` |

###### Returns

`Promise`<`Cookie`\>

###### Overrides

CookieJar.setCookie

___

##### fromCookieJar

▸ `Static` **fromCookieJar**(`cookieJar`): [`RequestItCookieJar`](#classesrequestitcookiejarmd)

###### Parameters

| Name | Type |
| :------ | :------ |
| `cookieJar` | `CookieJar` |

###### Returns

[`RequestItCookieJar`](#classesrequestitcookiejarmd)


<a name="classesrequestitheadersmd"></a>

### Class: RequestItHeaders

#### Hierarchy

- `Map`<`string`, `string`\>

  ↳ **`RequestItHeaders`**

#### Implements

- `Headers`

#### Constructors

##### constructor

• **new RequestItHeaders**(`init`)

###### Parameters

| Name | Type |
| :------ | :------ |
| `init` | `Iterable`<readonly [`string`, `string`]\> \| `Record`<`string`, `string` \| `string`[]\> |

###### Overrides

Map&lt;string, string\&gt;.constructor

#### Properties

##### forEach

• **forEach**: (`callbackfn`: (`value`: `string`, `key`: `string`, `parent`: [`RequestItHeaders`](#classesrequestitheadersmd)) => `void`, `thisArg?`: `any`) => `void`

###### Type declaration

▸ (`callbackfn`, `thisArg?`): `void`

####### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`value`: `string`, `key`: `string`, `parent`: [`RequestItHeaders`](#classesrequestitheadersmd)) => `void` |
| `thisArg?` | `any` |

####### Returns

`void`

###### Implementation of

Headers.forEach

###### Overrides

Map.forEach

#### Methods

##### append

▸ **append**(`name`, `value`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

###### Returns

`void`

###### Implementation of

Headers.append

___

##### set

▸ **set**(`name`, `value`): [`RequestItHeaders`](#classesrequestitheadersmd)

###### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

###### Returns

[`RequestItHeaders`](#classesrequestitheadersmd)

###### Implementation of

Headers.set

###### Overrides

Map.set


<a name="classesrequestitresponsemd"></a>

### Class: RequestItResponse

#### Implements

- `Response`

#### Constructors

##### constructor

• **new RequestItResponse**(`msg`)

###### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | [`IncomingMessage`](#interfacesincomingmessagemd) |

#### Accessors

##### body

• `get` **body**(): `ReadableStream`<`Uint8Array`\>

###### Returns

`ReadableStream`<`Uint8Array`\>

###### Implementation of

Response.body

___

##### bodyUsed

• `get` **bodyUsed**(): `boolean`

###### Returns

`boolean`

###### Implementation of

Response.bodyUsed

___

##### cookies

• `get` **cookies**(): [`RequestItCookieJar`](#classesrequestitcookiejarmd)

Because server-side javascript has no global cookie methods.

###### Returns

[`RequestItCookieJar`](#classesrequestitcookiejarmd)

___

##### headers

• `get` **headers**(): [`RequestItHeaders`](#classesrequestitheadersmd)

###### Returns

[`RequestItHeaders`](#classesrequestitheadersmd)

###### Implementation of

Response.headers

___

##### ok

• `get` **ok**(): `boolean`

###### Returns

`boolean`

###### Implementation of

Response.ok

___

##### redirected

• `get` **redirected**(): `boolean`

###### Returns

`boolean`

###### Implementation of

Response.redirected

___

##### status

• `get` **status**(): `number`

###### Returns

`number`

###### Implementation of

Response.status

___

##### statusText

• `get` **statusText**(): `string`

###### Returns

`string`

###### Implementation of

Response.statusText

___

##### type

• `get` **type**(): `ResponseType`

Always basic; server side has no respect for cors.

###### Returns

`ResponseType`

###### Implementation of

Response.type

___

##### url

• `get` **url**(): `string`

###### Returns

`string`

###### Implementation of

Response.url

#### Methods

##### arrayBuffer

▸ **arrayBuffer**(): `Promise`<`ArrayBuffer`\>

###### Returns

`Promise`<`ArrayBuffer`\>

###### Implementation of

Response.arrayBuffer

___

##### blob

▸ **blob**(): `never`

Unsupported method.

###### Returns

`never`

###### Implementation of

Response.blob

___

##### clone

▸ **clone**(): [`RequestItResponse`](#classesrequestitresponsemd)

###### Returns

[`RequestItResponse`](#classesrequestitresponsemd)

###### Implementation of

Response.clone

___

##### formData

▸ **formData**(): `never`

Unsupported method.

###### Returns

`never`

###### Implementation of

Response.formData

___

##### json

▸ **json**(): `Promise`<`any`\>

###### Returns

`Promise`<`any`\>

###### Implementation of

Response.json

___

##### text

▸ **text**(): `Promise`<`string`\>

###### Returns

`Promise`<`string`\>

###### Implementation of

Response.text


<a name="interfacesincomingmessagemd"></a>

### Interface: IncomingMessage

#### Hierarchy

- `IncomingMessage`

  ↳ **`IncomingMessage`**

#### Properties

##### body

• **body**: `any`

___

##### cookieJar

• **cookieJar**: [`RequestItCookieJar`](#classesrequestitcookiejarmd)

___

##### rawBody

• **rawBody**: `Buffer`

___

##### rawResponse

• **rawResponse**: `Buffer`

___

##### rawText

• **rawText**: `string`

___

##### redirected

• **redirected**: `boolean`

___

##### url

• **url**: `string`

###### Overrides

http.IncomingMessage.url

#### Methods

##### json

▸ **json**(): `any`

###### Returns

`any`


<a name="interfacesrequestitstoremd"></a>

### Interface: RequestItStore

#### Hierarchy

- `Store`

  ↳ **`RequestItStore`**

#### Methods

##### findCookie

▸ **findCookie**(`domain`, `path`, `key`): `Promise`<`Cookie`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `path` | `string` |
| `key` | `string` |

###### Returns

`Promise`<`Cookie`\>

###### Overrides

Store.findCookie


<a name="interfacesrequestoptionsmd"></a>

### Interface: RequestOptions

#### Hierarchy

- `RequestOptions`

  ↳ **`RequestOptions`**

#### Properties

##### body

• `Optional` **body**: `string` \| `object` \| `any`[] \| `Buffer`

___

##### cookieJar

• `Optional` **cookieJar**: [`RequestItCookieJar`](#classesrequestitcookiejarmd) \| `CookieJar`

___

##### followRedirect

• `Optional` **followRedirect**: `boolean`

___

##### form

• `Optional` **form**: `URLSearchParams` \| { [key: string]: `string` \| `boolean` \| `number`;  }

___

##### json

• `Optional` **json**: `object` \| `any`[]

___

##### maxRedirects

• `Optional` **maxRedirects**: `number`

___

##### params

• `Optional` **params**: `Object`

###### Index signature

▪ [key: `string`]: `string` \| `boolean` \| `number`

___

##### rejectBadJson

• `Optional` **rejectBadJson**: `boolean`

___

##### responseType

• `Optional` **responseType**: ``"json"``

___

##### url

• `Optional` **url**: `string` \| `URL`
