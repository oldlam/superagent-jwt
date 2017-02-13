# SuperAgent JWT Plugin

a [superagent](https://github.com/visionmedia/superagent) plugin to retrieve/add [JWT](https://jwt.io/) from/to headers, storing with localStorage.

this plugin:

- tries to retrieve JWT from response header and store it to localStorage
- set JWT in request *Authorization* header if any was saved to localStorage before

## Installation

```
$ npm i superagent-jwt -S
```

## Usage

```js
var request = require('superagent');
var JWT = require('superagent-jwt');

var jwt = JWT({
  header: 'jwt', // header name to try reading JWT from responses, default to 'jwt'
  local: 'jwt'   // key to store the JWT in localStorage, also default to 'jwt'
});

request
  .get('/some-url')
  .use(jwt)
  .end(function(err, res) {
    /**
     * JWT will be sent along with the request
     * if one was received from server header before
     */
  });

```

## License

[MIT](License)
