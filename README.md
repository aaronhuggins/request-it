# RequestIt Client

A stupidly simple HTTP client for Node-JS that should just work. Built-in support for cookies, JSON, and may follow up to a max of 20 redirects.

## Usage

Install via [NPM](https://www.npmjs.com/package/request-it-client) and require in your project. Then request it and go!

```js
const { RequestIt } = require('request-it-client')

;(async function main () {
  const res = await RequestIt.go('https://reqres.in/api/users/2')

  console.log(res.body.data.first_name) // expected result: Janet
})()
```

## API


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
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### get

▸ **get**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### go

▸ **go**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

Base method for making a request.

###### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

The IncomingMessage object with parsed body and RawBody.

___

##### patch

▸ **patch**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### post

▸ **post**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### put

▸ **put**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### delete

▸ `Static` **delete**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### get

▸ `Static` **get**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### go

▸ `Static` **go**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### patch

▸ `Static` **patch**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### post

▸ `Static` **post**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

###### Returns

`Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

___

##### put

▸ `Static` **put**(`options?`): `Promise`<[`IncomingMessage`](#interfacesincomingmessagemd)\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `string` \| [`RequestOptions`](#interfacesrequestoptionsmd) \| `URL` |

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

• `Optional` **form**: `Object`

###### Index signature

▪ [key: `string`]: `string` \| `boolean` \| `number`

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
